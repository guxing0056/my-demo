import { defineStore } from "pinia";
import ERC20 from "@/utils/abi/ERC20.json";
import MMP_IDO from "@/utils/abi/MMP_IDO.json";
import { AbiItem } from "web3-utils";
import { useWalletStore } from "./wallet";
import { useConfig } from "@/config";
import { fromDecimalValue, toDecimalValue } from "@/utils";

const config = useConfig();

export interface MMPState {
  mmpIdoOwner: string;
  mmpIdoPrice: number;
  mmpIdoDeposited: number | string;
  mmpIdoTotalDeposited: number | string;
  mmpIdoDepositOpen: boolean;
  mmpIdoClaimOpen: boolean;
  usdcBalance: number;
  usdcAllowance: number;
}

export const useMmpStore = defineStore({
  id: "mmps",
  state: (): MMPState => ({
    mmpIdoOwner: "",
    mmpIdoPrice: 0,
    mmpIdoDeposited: 0,
    mmpIdoTotalDeposited: 0,
    mmpIdoDepositOpen: false,
    mmpIdoClaimOpen: false,
    usdcBalance: 0,
    usdcAllowance: 0,
  }),
  getters: {},
  actions: {
    async loadUsdc() {
      return useWalletStore().loadContract({ address: config.contracts.USDC });
    },
    async loadMmp() {
      return useWalletStore().loadContract({ address: config.contracts.MMP });
    },
    async loadMmpIdo() {
      return useWalletStore().loadContract({
        address: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
      });
    },
    async loadUsdcBalance({ address }: { address: string }) {
      const balance = await useWalletStore().loadBalance({
        token: config.contracts.USDC,
        owner: address,
      });

      this.usdcBalance = balance;

      return balance;
    },

    async loadMmpIdoOwner() {
      const owner = await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "owner",
      });
      this.mmpIdoOwner = owner;
      console.log(owner);
      return owner;
    },
    async loadUsdcAllowance({ owner }: { owner: string }) {
      const allowance = await useWalletStore().loadAllowance({
        token: config.contracts.USDC,
        owner,
        spender: config.contracts.MMP_IDO,
      });
      this.usdcAllowance = allowance;
      console.log("allowance", owner, allowance);

      return allowance;
    },
    async approveMmpIdoDeposit({ amount }: { amount: number }) {
      await useWalletStore().approve({
        token: config.contracts.USDC,
        spender: config.contracts.MMP_IDO,
        amount,
      });

      this.usdcAllowance = amount;
    },
    async mmpIdodeposit({ amount }: { amount: number }) {
      await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        method: "deposit",
        abi: MMP_IDO as AbiItem[],
        params: [toDecimalValue(amount, 18).toString()],
        send: true,
      });

      this.loadMmpIdoTotalDeposited();
    },
    async loadMmpIdoPrice() {
      const price = await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "price",
      });

      this.mmpIdoPrice = fromDecimalValue(price, 10).toNumber();

      return price;
    },
    async loadMmpIdoTotalDeposited() {
      const deposited = await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "totalDepositedAmount",
      });

      console.log("totalDepositedAmount", deposited);

      this.mmpIdoDeposited = fromDecimalValue(deposited, 18).toString();

      return deposited;
    },
    async loadMmpIdoDeposited({ owner }: { owner: string }) {
      const deposited = await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "depositedAmount",
        params: [owner],
      });

      console.log("deposited", deposited);

      this.mmpIdoDeposited = fromDecimalValue(deposited, 18).toString();

      return deposited;
    },
    async loadMmpIdoDepositStatus() {
      const open = await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "isDepositOpen",
      });
      this.mmpIdoDepositOpen = open;

      return open;
    },
    async loadMmpIdoClaimStatus() {
      const open = await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "isClaimOpen",
      });
      this.mmpIdoClaimOpen = open;

      return open;
    },
    async toggleMmpIdoDepositStatus() {
      await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "toggleDepositOpen",
        send: true,
      });

      this.mmpIdoDepositOpen = !this.mmpIdoDepositOpen;
    },
    async toggleMmpIdoClaimStatus() {
      await useWalletStore().contractCall({
        contract: config.contracts.MMP_IDO,
        abi: MMP_IDO as AbiItem[],
        method: "toggleClaimOpen",
        send: true,
      });

      this.mmpIdoClaimOpen = !this.mmpIdoClaimOpen;
    },
  },
});
