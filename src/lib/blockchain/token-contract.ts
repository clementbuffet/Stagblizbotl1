import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

const DARE_TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function mint(address to, uint256 amount) returns (bool)",
];

export class DareTokenContract {
  private contract: ethers.Contract;
  private provider: Web3Provider;

  constructor(contractAddress: string) {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.contract = new ethers.Contract(contractAddress, DARE_TOKEN_ABI, this.provider);
    } else {
      throw new Error('Web3 provider not found');
    }
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.contract.balanceOf(address);
    return ethers.formatEther(balance);
  }

  async transfer(to: string, amount: string): Promise<boolean> {
    const signer = await this.provider.getSigner();
    const tx = await this.contract.connect(signer).transfer(to, ethers.parseEther(amount));
    await tx.wait();
    return true;
  }

  async mint(to: string, amount: string): Promise<boolean> {
    const signer = await this.provider.getSigner();
    const tx = await this.contract.connect(signer).mint(to, ethers.parseEther(amount));
    await tx.wait();
    return true;
  }
}