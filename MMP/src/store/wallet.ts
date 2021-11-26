import { fromDecimalValue, isEthereumAddress, toDecimalValue } from "@/utils";
import { defineStore } from "pinia";
import { AbiItem } from "web3-utils";
import ERC20 from "@/utils/abi/ERC20.json";

import Web3 from "web3/dist/web3.min.js";
import {
  contractCall,
  getAccounts,
  getChainID,
  getContract,
  getGasPrice,
  getWeb3,
  setWalletProvider,
} from "../utils/web3";
import { useLoadingStore } from "./plugins/loading";
import Decimal from "decimal.js";

export interface Token {
  address: string;
  contract: Web3.eth.Contract;
  name: string;
  symbol: string;
  totalSupply: number;
  decimals: number;
}

export interface Contract {
  address: string;
  contract: Web3.eth.Contract;
}

export interface WalletState {
  chainID?: number;
  originalWeb3?: Web3;
  accounts: string[];
  contracts: {
    [address: string]: Contract;
  };
  tokens: {
    [address: string]: Token;
  };
  balances: {
    [key: string]: number;
  };
}

export const useWalletStore = defineStore({
  id: "wallet",
  state: (): WalletState => ({
    originalWeb3: undefined,
    accounts: [],
    contracts: {},
    tokens: {},
    balances: {},
  }),
  getters: {
    web3(state) {
      return state.originalWeb3 || new Web3();
    },
    activeAccount(state) {
      return state.accounts[0];
    },
  },
  actions: {
    async connectWallet(wallet: string) {
      setWalletProvider(wallet);

      await this.loadAccounts();
      return true;
    },

    async loadChainID({ force = false }: { force?: boolean } = {}) {
      if (this.chainID === undefined || force) {
        this.chainID = (await getChainID()) || 0;
      }

      return this.chainID;
    },
    async loadWeb3() {
      if (!this.originalWeb3) {
        this.originalWeb3 = await getWeb3();
      }

      return this.originalWeb3;
    },
    async cleanAccounts() {
      this.accounts = [];
    },
    async loadAccounts() {
      await this.loadWeb3();
      this.accounts = await getAccounts();

      return this.accounts;
    },
    async loadTokensByGuessString({ guessString }: { guessString: string }) {
      const tokens: Token[] = [];

      if (isEthereumAddress(guessString)) {
        try {
          const token = await this.loadToken({ address: guessString });

          tokens.push(token);
        } catch (e) {
          console.error(e);
        }
      }

      return tokens;
    },

    async loadContract({
      address,
      abi = ERC20 as AbiItem[],
      force,
    }: {
      address: string;
      abi?: AbiItem | AbiItem[];
      force?: boolean;
    }) {
      if (!this.contracts[address] || force) {
        const contract = await getContract(abi, address);

        this.contracts[address] = {
          address,
          contract,
        };
      }

      return this.contracts[address];
    },

    async loadToken({ address, force }: { address: string; force?: boolean }) {
      if (!this.tokens[address] || force) {
        const { contract } = await this.loadContract({
          address,
          abi: ERC20 as AbiItem[],
        });

        this.tokens[address] = {
          address,
          contract,
          name: await contract.methods.name().call(),
          symbol: await contract.methods.symbol().call(),
          totalSupply: await contract.methods.totalSupply().call(),
          decimals: await contract.methods.decimals().call(),
        };
      }

      return this.tokens[address];
    },
    async approve({
      token,
      spender,
      amount,
    }: {
      token: string;
      spender: string;
      amount: number | string | Decimal;
    }) {
      const { contract, decimals } = await this.loadToken({
        address: token,
      });
      const value = toDecimalValue(amount, decimals).toString();

      const tx = await contractCall({
        contract,
        method: "approve",
        params: [spender, value],
        from: this.activeAccount,

        send: true,
      });

      return tx;
    },

    async loadBalance({ token, owner }: { token: string; owner: string }) {
      const key = `loadBalance:${token}_${owner}`;

      return useLoadingStore().loadingWith(key, async () => {
        const { contract, decimals } = await this.loadToken({
          address: token,
        });

        const balanceAmount = await contractCall({
          contract,
          method: "balanceOf",
          params: [owner],
          from: this.activeAccount,
        });
        const balance = fromDecimalValue(balanceAmount, decimals).toNumber();

        this.balances = {
          [`${token}_${owner}`]: balance,
          ...this.balances,
        };

        return balance;
      });
    },

    async loadAllowance({
      token,
      owner,
      spender,
    }: {
      token: string;
      owner: string;
      spender: string;
    }) {
      const { contract, decimals } = await this.loadToken({
        address: token,
      });

      const allowanceAmount = await contractCall({
        contract,
        method: "allowance",
        params: [owner, spender],
        from: this.activeAccount,
      });

      return fromDecimalValue(allowanceAmount, decimals).toNumber();
    },

    async contractCall({
      contract: contractAddress,
      method,
      abi,
      params,
      send = false,
    }: {
      contract: string;
      method: string;
      abi: AbiItem[] | AbiItem;
      params?: any;
      send?: boolean;
    }) {
      const { contract } = await this.loadContract({
        address: contractAddress,
        abi,
      });

      return contractCall({
        contract,
        method,
        params,
        from: this.activeAccount,

        send,
      });
    },

    async contractCreate({
      abi,
      data,
    }: {
      abi: AbiItem[] | AbiItem;
      data: string;
    }) {
      const deployOptions = {
        data,
      };
      const contract = await getContract(abi, undefined, deployOptions);

      let gas = 100000;
      try {
        gas = await contract.deploy(deployOptions).estimateGas();
      } catch (e) {
        console.error("gas estimate error:" + (e as any).message);
      }

      const gasPrice = await getGasPrice();

      return contract.deploy(deployOptions).send({
        from: this.activeAccount,
        gas,
        gasPrice,
      });
    },
  },
});
