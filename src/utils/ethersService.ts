import { ethers } from 'ethers';

// ProjectToken contract ABI (you'll need to update this after compilation)
const PROJECT_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function mint(address to, uint256 amount)",
  "function batchMint(address[] recipients, uint256[] amounts)",
  "function owner() view returns (address)",
  "function transferOwnership(address newOwner)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event TokensMinted(address indexed to, uint256 amount, string reason)"
];

// Contract address (update this after deployment)
const PROJECT_TOKEN_ADDRESS = process.env.REACT_APP_PROJECT_TOKEN_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Network configurations
const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex
const HARDHAT_CHAIN_ID = "0x7a69"; // 31337 in hex

const SEPOLIA_CHAIN_CONFIG = {
  chainId: SEPOLIA_CHAIN_ID,
  chainName: "Sepolia Test Network",
  nativeCurrency: {
    name: "Sepolia ETH",
    symbol: "SEP",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.infura.io/v3/"],
  blockExplorerUrls: ["https://sepolia.etherscan.io/"],
};

const HARDHAT_CHAIN_CONFIG = {
  chainId: HARDHAT_CHAIN_ID,
  chainName: "Hardhat Local Network",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["http://127.0.0.1:8545/"],
  blockExplorerUrls: [],
};

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

interface TransactionResult {
  transactionHash: string;
  blockNumber: number;
  gasUsed: string;
}

interface TokenEvent {
  recipient?: string;
  from?: string;
  to?: string;
  amount: string;
  reason?: string;
  transactionHash: string;
  blockNumber: number;
}

class EthersService {
  public provider: ethers.BrowserProvider | null = null;
  public signer: ethers.JsonRpcSigner | null = null;
  public contract: ethers.Contract | null = null;
  public userAddress: string | null = null;

  // Check if MetaMask is installed
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
  }

  // Connect to MetaMask using ethers.js
  async connectWallet(): Promise<{ address: string; network: any }> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create ethers.js BrowserProvider (v6 syntax)
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
      this.signer = await this.provider.getSigner();
      this.userAddress = await this.signer.getAddress();
      
      // Initialize contract with ethers.js
      this.contract = new ethers.Contract(PROJECT_TOKEN_ADDRESS, PROJECT_TOKEN_ABI, this.signer);
      
      // Check if we're on the correct network
      await this.switchToSepolia();
      
      return {
        address: this.userAddress,
        network: await this.provider.getNetwork()
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  // Switch to Sepolia testnet
  async switchToSepolia(): Promise<void> {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_CHAIN_CONFIG],
          });
        } catch (addError) {
          throw new Error('Failed to add Sepolia network to MetaMask');
        }
      } else {
        throw new Error('Failed to switch to Sepolia network');
      }
    }
  }

  // Get user's ETH balance using ethers.js
  async getEthBalance(address?: string): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected');
    
    const targetAddress = address || this.userAddress;
    if (!targetAddress) throw new Error('No address provided');
    
    const balance = await this.provider.getBalance(targetAddress);
    return ethers.formatEther(balance); // ethers.js v6 syntax
  }

  // Get user's token balance using ethers.js
  async getTokenBalance(address?: string): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const targetAddress = address || this.userAddress;
    if (!targetAddress) throw new Error('No address provided');
    
    const balance = await this.contract.balanceOf(targetAddress);
    return ethers.formatEther(balance); // ethers.js v6 syntax
  }

  // Get token information using ethers.js
  async getTokenInfo(): Promise<TokenInfo> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      this.contract.name(),
      this.contract.symbol(),
      this.contract.decimals(),
      this.contract.totalSupply()
    ]);
    
    return {
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: ethers.formatEther(totalSupply) // ethers.js v6 syntax
    };
  }

  // Mint tokens (admin only) using ethers.js
  async mintTokens(recipientAddress: string, amount: string): Promise<TransactionResult> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      const amountInWei = ethers.parseEther(amount.toString()); // ethers.js v6 syntax
      const tx = await this.contract.mint(recipientAddress, amountInWei);
      
      console.log('Minting transaction sent:', tx.hash);
      const receipt = await tx.wait(); // Wait for transaction confirmation
      console.log('Minting confirmed:', receipt);
      
      return {
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    }
  }

  // Batch mint tokens (admin only) using ethers.js
  async batchMintTokens(recipients: string[], amounts: string[]): Promise<TransactionResult> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    try {
      const amountsInWei = amounts.map(amount => ethers.parseEther(amount.toString())); // ethers.js v6 syntax
      const tx = await this.contract.batchMint(recipients, amountsInWei);
      
      console.log('Batch minting transaction sent:', tx.hash);
      const receipt = await tx.wait(); // Wait for transaction confirmation
      console.log('Batch minting confirmed:', receipt);
      
      return {
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      console.error('Batch minting failed:', error);
      throw error;
    }
  }

  // Transfer tokens using ethers.js
  async transferTokens(recipientAddress: string, amount: string): Promise<TransactionResult> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      const amountInWei = ethers.parseEther(amount.toString()); // ethers.js v6 syntax
      const tx = await this.contract.transfer(recipientAddress, amountInWei);
      
      console.log('Transfer transaction sent:', tx.hash);
      const receipt = await tx.wait(); // Wait for transaction confirmation
      console.log('Transfer confirmed:', receipt);
      
      return {
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  }

  // Check if current user is contract owner using ethers.js
  async isOwner(): Promise<boolean> {
    if (!this.contract || !this.userAddress) return false;
    
    try {
      const owner = await this.contract.owner();
      return owner.toLowerCase() === this.userAddress.toLowerCase();
    } catch (error) {
      console.error('Failed to check ownership:', error);
      return false;
    }
  }

  // Listen to token events using ethers.js
  setupEventListeners(
    onTokensMinted?: (event: TokenEvent) => void,
    onTransfer?: (event: TokenEvent) => void
  ): void {
    if (!this.contract) throw new Error('Contract not initialized');
    
    // Listen for TokensMinted events using ethers.js
    if (onTokensMinted) {
      this.contract.on('TokensMinted', (to: string, amount: bigint, reason: string, event: any) => {
        onTokensMinted({
          recipient: to,
          amount: ethers.formatEther(amount), // ethers.js v6 syntax
          reason,
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber
        });
      });
    }
    
    // Listen for Transfer events using ethers.js
    if (onTransfer) {
      this.contract.on('Transfer', (from: string, to: string, amount: bigint, event: any) => {
        onTransfer({
          from,
          to,
          amount: ethers.formatEther(amount), // ethers.js v6 syntax
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber
        });
      });
    }
  }

  // Remove event listeners using ethers.js
  removeEventListeners(): void {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }

  // Disconnect wallet
  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.userAddress = null;
  }

  // Additional ethers.js specific methods

  // Get gas price using ethers.js
  async getGasPrice(): Promise<any> {
    if (!this.provider) throw new Error('Provider not initialized');
    const gasPrice = await this.provider.getFeeData();
    return gasPrice;
  }

  // Estimate gas for a transaction using ethers.js
  async estimateGas(method: string, ...args: any[]): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    try {
      const gasEstimate = await (this.contract as any)[method].estimateGas(...args);
      return gasEstimate.toString();
    } catch (error) {
      console.error('Gas estimation failed:', error);
      throw error;
    }
  }

  // Get transaction receipt using ethers.js
  async getTransactionReceipt(txHash: string): Promise<any> {
    if (!this.provider) throw new Error('Provider not initialized');
    return await this.provider.getTransactionReceipt(txHash);
  }

  // Get current block number using ethers.js
  async getBlockNumber(): Promise<number> {
    if (!this.provider) throw new Error('Provider not initialized');
    return await this.provider.getBlockNumber();
  }
}

// Create and export a singleton instance
const ethersService = new EthersService();
export default ethersService;
