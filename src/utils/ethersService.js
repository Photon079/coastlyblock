import { ethers } from 'ethers';

// ProjectToken contract ABI
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

// Contract address
const PROJECT_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Network configurations
const HARDHAT_CHAIN_ID = "0x7a69"; // 31337 in hex
const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex

// Frontend env for Sepolia contract address (supports Vite and CRA styles)
let SEPOLIA_ADDR_FROM_ENV = undefined;
try {
  if (typeof import.meta !== 'undefined' && import.meta && import.meta.env) {
    SEPOLIA_ADDR_FROM_ENV = import.meta.env.VITE_SEPOLIA_PROJECT_TOKEN_ADDRESS || import.meta.env.REACT_APP_PROJECT_TOKEN_ADDRESS || undefined;
  }
} catch {}
if (!SEPOLIA_ADDR_FROM_ENV) {
  try {
    if (typeof process !== 'undefined' && process.env) {
      SEPOLIA_ADDR_FROM_ENV = process.env.VITE_SEPOLIA_PROJECT_TOKEN_ADDRESS || process.env.REACT_APP_PROJECT_TOKEN_ADDRESS || undefined;
    }
  } catch {}
}

// Known contract addresses per chain (Hardhat local and Sepolia). Update Sepolia after deployment.
const CONTRACT_ADDRESSES = {
  [HARDHAT_CHAIN_ID]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  [SEPOLIA_CHAIN_ID]: SEPOLIA_ADDR_FROM_ENV || undefined,
};

const HARDHAT_CHAIN_CONFIG = {
  chainId: HARDHAT_CHAIN_ID,
  chainName: "Hardhat Local Network",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  // Include both localhost and 127.0.0.1 to avoid mismatches
  rpcUrls: ["http://127.0.0.1:8545/", "http://localhost:8545/"],
  blockExplorerUrls: [],
};

class EthersService {
  constructor() {
    this.provider = null;
    this.readProvider = null;
    this.signer = null;
    this.contract = null;
    this.userAddress = null;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  // Connect to MetaMask
  async connectWallet() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access (simple, proven flow)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      // Determine current wallet network; support both Hardhat and Sepolia without forcing a switch
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

      // Create ethers.js BrowserProvider (no forced switch here)
      this.provider = new ethers.BrowserProvider(window.ethereum);
      // Create a direct JSON-RPC provider for reliable read ops.
      // Use local RPC ONLY when the app is running on localhost (dev). On Vercel, fall back to injected provider.
      const isLocalhost = typeof window !== 'undefined' && (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname));
      if (currentChainId === HARDHAT_CHAIN_ID && isLocalhost) {
        try {
          this.readProvider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
          // probe quickly
          await this.readProvider.getNetwork();
        } catch {
          // fallback to wallet provider if local node unavailable
          this.readProvider = this.provider;
        }
      } else {
        this.readProvider = this.provider;
      }
      this.signer = await this.provider.getSigner();
      this.userAddress = (accounts && accounts[0]) ? accounts[0] : await this.signer.getAddress();

      // Initialize contract after provider/signer are set on the correct network.
      // Do this best-effort so login doesn't fail if no contract is deployed on the user's chain.
      try {
        await this.initContract();
      } catch (e) {
        console.warn('Contract init skipped during connectWallet:', e?.message || e);
      }
      
      return {
        address: this.userAddress,
        network: await this.provider.getNetwork()
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async initContract() {
    try {
      console.log('=== CONTRACT INITIALIZATION ===');
      // Resolve chainId from provider
      const net = await this.provider.getNetwork();
      const chainIdHex = '0x' + Number(net.chainId).toString(16);
      console.log('Detected chainId:', chainIdHex);

      let address = CONTRACT_ADDRESSES[chainIdHex];
      if (!address) {
        if (chainIdHex === SEPOLIA_CHAIN_ID) {
          throw new Error('Sepolia contract address is not set. Please set VITE_SEPOLIA_PROJECT_TOKEN_ADDRESS (or REACT_APP_PROJECT_TOKEN_ADDRESS) in .env and rebuild.');
        }
        // Fallback to previous resolution logic for local/dev
        address = PROJECT_TOKEN_ADDRESS;
      }
      const abi = PROJECT_TOKEN_ABI;
      // Try to load deployment file to get the latest address (local dev convenience)
      try {
        const isLocalhost = typeof window !== 'undefined' && (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname));
        if (isLocalhost) {
          let used = null;
          // Prefer hardhat file
          let res = await fetch('/deployments/hardhat-deployment.json');
          if (!res.ok) {
            // Fallback to localhost file name if present
            res = await fetch('/deployments/localhost-deployment.json');
            if (res.ok) used = 'localhost';
          } else {
            used = 'hardhat';
          }

          if (res.ok) {
            const dep = await res.json();
            if (dep && dep.contractAddress) {
              // Only override when on a local dev network
              if (chainIdHex === HARDHAT_CHAIN_ID) {
                address = dep.contractAddress;
                console.log(`Using ${used} deployment file address:`, address);
              }
            } else {
              console.warn('Deployment file loaded but missing contractAddress, using fallback constant');
            }
          } else {
            console.warn('Could not load any deployment file, using fallback constant');
          }
        }
      } catch (e) {
        console.warn('Failed to fetch deployment file(s), using fallback constant');
      }
      // Build candidate list: last-known (localStorage), deployment-file address, constants
      const candidates = [];
      try {
        const saved = window.localStorage.getItem('ptkAddress');
        if (saved) candidates.push(saved);
      } catch {}
      candidates.push(address);
      // Common localhost default used by Hardhat in some setups
      candidates.push('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');

      // De-duplicate and probe
      const probed = new Set();
      let resolved = null;
      const network = await this.readProvider.getNetwork();
      console.log('Read provider chainId:', Number(network.chainId));
      for (const candidate of candidates) {
        if (!candidate || probed.has(candidate.toLowerCase())) continue;
        probed.add(candidate.toLowerCase());
        let code = await this.readProvider.getCode(candidate);
        if (code === '0x') {
          await new Promise(r => setTimeout(r, 150));
          code = await this.readProvider.getCode(candidate);
        }
        console.log(`Probe ${candidate} -> hasCode:`, code !== '0x');
        if (code !== '0x') { resolved = candidate; break; }
      }

      if (!resolved) {
        throw new Error('No deployed ProjectToken contract found on current chain. Ensure Hardhat node is running and re-deploy.');
      }

      address = resolved;
      try { window.localStorage.setItem('ptkAddress', address); } catch {}
      console.log('Resolved contract address:', address);

      // Create contract instance with signer for write ops
      this.contract = new ethers.Contract(address, abi, this.signer);
      console.log('Contract initialized successfully');
    } catch (error) {
      console.error('Failed to initialize contract:', error);
      throw error;
    }
  }

  // Switch to Hardhat network
  async switchToHardhat() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HARDHAT_CHAIN_ID }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [HARDHAT_CHAIN_CONFIG],
          });
        } catch (addError) {
          throw new Error('Failed to add Hardhat network to MetaMask');
        }
      } else {
        throw new Error('Failed to switch to Hardhat network');
      }
    }
  }

  // Get user's ETH balance
  async getEthBalance(address) {
    if (!this.provider) throw new Error('Wallet not connected');
    
    const targetAddress = address || this.userAddress;
    if (!targetAddress) throw new Error('No address provided');
    
    const balance = await this.provider.getBalance(targetAddress);
    return ethers.formatEther(balance);
  }

  // Get user's token balance
  async getTokenBalance(address) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const targetAddress = address || this.userAddress;
    if (!targetAddress) throw new Error('No address provided');
    
    const balance = await this.contract.balanceOf(targetAddress);
    return ethers.formatEther(balance);
  }

  // Get token information
  async getTokenInfo() {
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
      totalSupply: ethers.formatEther(totalSupply)
    };
  }

  // Mint tokens (admin only)
  async mintTokens(recipientAddress, amount) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    console.log('=== MINTING DEBUG ===');
    console.log('Contract address:', this.contract.target || this.contract.address);
    console.log('Recipient address:', recipientAddress);
    console.log('Amount:', amount);
    console.log('Current signer:', this.userAddress);
    console.log('Resolved contract address:', this.contract.address || this.contract.target);
    
    try {
    // Skip owner check - let the contract handle it

    const amountInWei = ethers.parseEther(amount.toString());
    console.log('Amount in wei:', amountInWei.toString());

    // Guard: do not allow minting to the contract itself
    const contractAddress = (this.contract.target || this.contract.address || '').toString();
    if (recipientAddress && contractAddress && recipientAddress.toLowerCase() === contractAddress.toLowerCase()) {
      throw new Error(`Recipient address cannot be the contract address (${contractAddress})`);
    }

    // Estimate gas first
      const gasEstimate = await this.contract.mint.estimateGas(recipientAddress, amountInWei);
      console.log('Gas estimate:', gasEstimate.toString());

      const tx = await this.contract.mint(recipientAddress, amountInWei);
      console.log('Transaction sent:', tx);

      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      // Try to decode the actual minted recipient from events
      let resolvedRecipient = null;
      let resolvedAmount = null;
      const iface = this.contract.interface;
      try {
        for (const log of receipt.logs) {
          try {
            const parsed = iface.parseLog(log);
            if (parsed && parsed.name === 'TokensMinted') {
              resolvedRecipient = parsed.args.to;
              resolvedAmount = ethers.formatEther(parsed.args.amount);
              break;
            }
            if (parsed && parsed.name === 'Transfer') {
              const from = parsed.args.from;
              const to = parsed.args.to;
              if (from && from.toLowerCase() === '0x0000000000000000000000000000000000000000') {
                resolvedRecipient = to;
                resolvedAmount = ethers.formatEther(parsed.args.value);
                break;
              }
            }
          } catch {}
        }
      } catch (e) {
        console.warn('Event decode failed:', e);
      }

      return {
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        recipientResolved: resolvedRecipient || recipientAddress,
        amountResolved: resolvedAmount || amount.toString()
      };
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    }
  }

  // Batch mint tokens (admin only)
  async batchMintTokens(recipients, amounts) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    try {
      const amountsInWei = amounts.map(amount => ethers.parseEther(amount.toString()));
      const tx = await this.contract.batchMint(recipients, amountsInWei);
      
      console.log('Batch minting transaction sent:', tx.hash);
      const receipt = await tx.wait();
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

  // Transfer tokens
  async transferTokens(recipientAddress, amount) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      const amountInWei = ethers.parseEther(amount.toString());
      const tx = await this.contract.transfer(recipientAddress, amountInWei);
      
      console.log('Transfer transaction sent:', tx.hash);
      const receipt = await tx.wait();
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

  // Check if current user is contract owner
  async isOwner() {
    if (!this.contract || !this.userAddress) {
      console.log('Contract or userAddress not available:', { contract: !!this.contract, userAddress: this.userAddress });
      return false;
    }
    
    try {
      const owner = await this.contract.owner();
      console.log('Contract owner:', owner);
      console.log('Current user:', this.userAddress);
      console.log('Addresses match:', owner.toLowerCase() === this.userAddress.toLowerCase());
      return owner.toLowerCase() === this.userAddress.toLowerCase();
    } catch (error) {
      console.error('Failed to check ownership:', error);
      return false;
    }
  }

  // Listen to token events
  setupEventListeners(onTokensMinted, onTransfer) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    // Listen for TokensMinted events
    if (onTokensMinted) {
      this.contract.on('TokensMinted', (to, amount, reason, event) => {
        onTokensMinted({
          recipient: to,
          amount: ethers.formatEther(amount),
          reason,
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber
        });
      });
    }
    
    // Listen for Transfer events
    if (onTransfer) {
      this.contract.on('Transfer', (from, to, amount, event) => {
        onTransfer({
          from,
          to,
          amount: ethers.formatEther(amount),
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber
        });
      });
    }
  }

  // Remove event listeners
  removeEventListeners() {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }

  // Disconnect wallet
  disconnect() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.userAddress = null;
  }

  // Runtime helpers to override or read the resolved address (useful if fetch fails)
  getResolvedAddress() {
    try {
      return window.localStorage.getItem('ptkAddress') || PROJECT_TOKEN_ADDRESS;
    } catch {
      return PROJECT_TOKEN_ADDRESS;
    }
  }

  async setContractAddress(address) {
    if (!address || !address.startsWith('0x') || address.length !== 42) {
      throw new Error('Invalid address');
    }
    // Verify code exists first
    const code = await this.readProvider.getCode(address);
    if (code === '0x') {
      throw new Error('No bytecode at the provided address on current chain');
    }
    // Persist and re-instantiate
    try { window.localStorage.setItem('ptkAddress', address); } catch {}
    this.contract = new ethers.Contract(address, PROJECT_TOKEN_ABI, this.signer);
    return address;
  }
}

// Create and export a singleton instance
const ethersService = new EthersService();
// Expose for debugging in browser console
try {
  if (typeof window !== 'undefined') {
    window.ethersService = ethersService;
    window.ethers = ethers;
  }
} catch {}
export default ethersService;
