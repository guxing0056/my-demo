import { AbiItem } from "web3-utils";
import { Contract, ContractOptions } from "web3-eth-contract";
import Web3 from "web3/dist/web3.min.js";

// TODO
// export function isConnected() {
//   return getProvider().isConnected() as boolean;
// }

export function hasConnectedAddress() {
  return getProvider().selectedAddress;
}

let wallet: string = "metamask";
let provider: any;
export function setWalletProvider(newWallet: string = wallet) {
  wallet = newWallet;

  if (wallet == "metamask") {
    if ((window as any).ethereum) {
      provider = (window as any).ethereum;
    } else if ((window as any).web3) {
      provider = (window as any).web3;
    }
  }
}

export function getProvider() {
  if (!provider) {
    setWalletProvider();
  }

  if (!provider) {
    throw new Error("Can't detect wallet type.");
  }

  return provider;
}

export async function getChainID() {
  const chainID = await getProvider().request({ method: "eth_chainId" });
  return parseInt(chainID, 16);
}

let instances: {
  [network: string]: Web3;
} = {};
export async function getWeb3(): Promise<Web3> {
  if (!instances[wallet]) {
    instances[wallet] = new Web3(getProvider());
  }

  return instances[wallet];
}

export async function getAccounts() {
  return getProvider().request({ method: "eth_requestAccounts" }) as string[];
}

export async function onEvent(eventName: string, callback) {
  getProvider().on(eventName, callback);
}

export function isMetaMask() {
  return getProvider().isMetaMask as boolean;
}

export function isMetamaskUnlocked() {
  return getProvider()._metamask.isUnlocked() as boolean;
}

export async function getContract(
  abi: AbiItem[] | AbiItem,
  address?: string,
  options?: ContractOptions
) {
  const web3 = await getWeb3();
  return new web3.eth.Contract(abi, address, options) as Contract;
}

export interface ContractApplyParams {
  contract: Web3.eth.Contract;
  method: string;
  params: any[];
  from: string;

  send?: boolean;
}

export async function getGasPrice() {
  const web3 = await getWeb3();
  const gasPrice = await web3.eth.getGasPrice();

  return gasPrice as string;
}

export async function contractCall({
  contract,
  method,
  params,
  from,
  send = false,
}: ContractApplyParams) {
  const web3 = await getWeb3();
  const gasPrice = await getGasPrice();
  let gas = 100000;
  try {
    gas = await contract.methods[method]
      .apply(null, params)
      .estimateGas({ from });
  } catch (e) {
    console.error("gas estimate error:" + (e as any).message);
  }
  const call = send ? "send" : "call";

  const result = await contract.methods[method].apply(null, params)[call]({
    from,
    gasPrice: gasPrice,
    gas,
  });

  return result;
}
