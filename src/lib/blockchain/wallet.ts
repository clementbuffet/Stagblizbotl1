import { ethers } from 'ethers';

export async function createWallet(): Promise<string> {
  const wallet = ethers.Wallet.createRandom();
  return wallet.address;
}

export async function getTokenBalance(address: string): Promise<number> {
  // TODO: Implement actual token balance check
  return 0;
}