import React, { useState, useEffect } from 'react';
import ethersService from '../utils/ethersService';

const RealTokenPanel = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState('0');
  const [ethBalance, setEthBalance] = useState('0');
  const [transactions, setTransactions] = useState([]);
  
  // Form states
  const [recipientAddress, setRecipientAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  useEffect(() => {
    checkConnection();
    setupEventListeners();
    
    return () => {
      ethersService.removeEventListeners();
    };
  }, []);

  const checkConnection = async () => {
    if (ethersService.userAddress) {
      setIsConnected(true);
      setUserAddress(ethersService.userAddress);
      await loadUserData();
    }
  };

  const setupEventListeners = () => {
    ethersService.setupEventListeners(
      (event) => {
        console.log('🎉 Tokens minted:', event);
        addTransaction({
          type: 'mint',
          hash: event.transactionHash,
          recipient: event.recipient,
          amount: event.amount,
          timestamp: new Date().toLocaleString()
        });
        loadUserData(); // Refresh data after minting
      },
      (event) => {
        console.log('💸 Transfer event:', event);
        addTransaction({
          type: 'transfer',
          hash: event.transactionHash,
          from: event.from,
          to: event.to,
          amount: event.amount,
          timestamp: new Date().toLocaleString()
        });
        loadUserData(); // Refresh data after transfer
      }
    );
  };

  const addTransaction = (tx) => {
    setTransactions(prev => [tx, ...prev.slice(0, 4)]); // Keep last 5 transactions
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      const connection = await ethersService.connectWallet();
      setIsConnected(true);
      setUserAddress(connection.address);
      await loadUserData();
      
      // Show real connection success
      alert(`🎉 REAL BLOCKCHAIN CONNECTION!

✅ Connected to: ${connection.address.slice(0, 6)}...${connection.address.slice(-4)}
🌐 Network: ${connection.network.name}
🔗 Chain ID: ${connection.network.chainId}

You're now connected to the REAL smart contract!`);
      
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('❌ Connection failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const [tokenData, ownerStatus, balance, ethBal] = await Promise.all([
        ethersService.getTokenInfo(),
        ethersService.isOwner(),
        ethersService.getTokenBalance(),
        ethersService.getEthBalance()
      ]);
      
      setTokenInfo(tokenData);
      setIsOwner(ownerStatus);
      setUserBalance(balance);
      setEthBalance(ethBal);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleRealMint = async (e) => {
    e.preventDefault();
    if (!recipientAddress || !mintAmount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      
      // REAL BLOCKCHAIN TRANSACTION
      const result = await ethersService.mintTokens(recipientAddress, mintAmount);
      
      // Show REAL transaction details
      alert(`🎉 REAL BLOCKCHAIN SUCCESS!

✅ Tokens minted on blockchain!
📍 Recipient: ${recipientAddress}
💰 Amount: ${mintAmount} PTK
🔗 TX Hash: ${result.transactionHash}
🧱 Block: ${result.blockNumber}
⛽ Gas Used: ${result.gasUsed}

🌐 View on Etherscan: 
https://etherscan.io/tx/${result.transactionHash}

The tokens are NOW in the NGO's wallet!`);
      
      // Clear form and refresh data
      setRecipientAddress('');
      setMintAmount('');
      await loadUserData();
      
    } catch (error) {
      console.error('Real minting failed:', error);
      alert('❌ BLOCKCHAIN ERROR: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">🔗 REAL Blockchain Connection</h2>
            <p className="text-white/70 mb-6">
              Connect to the ACTUAL smart contract on Hardhat network
            </p>
            <button
              onClick={connectWallet}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Connecting to Blockchain...' : '🚀 Connect to REAL Blockchain'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">🔗 REAL Blockchain Token Management</h2>
        <p className="text-white/70">Connected to LIVE smart contract</p>
      </div>

      {/* REAL Wallet Info */}
      <div className="backdrop-blur-md bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-emerald-300 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          LIVE Wallet Connection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Connected Address</p>
            <p className="text-white font-mono text-sm">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">ETH Balance</p>
            <p className="text-white">{parseFloat(ethBalance).toFixed(4)} ETH</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">PTK Balance</p>
            <p className="text-white">{parseFloat(userBalance).toFixed(4)} PTK</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Admin Status</p>
            <p className={`text-sm font-bold ${isOwner ? 'text-emerald-300' : 'text-red-300'}`}>
              {isOwner ? '✅ Contract Owner' : '❌ Not Owner'}
            </p>
          </div>
        </div>
      </div>

      {/* REAL Token Info */}
      {tokenInfo && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            LIVE Smart Contract Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-sm">Token Name</p>
              <p className="text-white">{tokenInfo.name}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-sm">Symbol</p>
              <p className="text-white">{tokenInfo.symbol}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-sm">Decimals</p>
              <p className="text-white">{tokenInfo.decimals}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/70 text-sm">Total Supply</p>
              <p className="text-white">{parseFloat(tokenInfo.totalSupply).toFixed(4)} PTK</p>
            </div>
          </div>
        </div>
      )}

      {/* REAL Minting (Admin Only) */}
      {isOwner && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            🔥 REAL Token Minting
          </h3>
          <form onSubmit={handleRealMint} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">NGO Wallet Address</label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">Amount (PTK)</label>
              <input
                type="number"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                placeholder="100"
                step="0.01"
                min="0"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? '⏳ Minting on Blockchain...' : '🔥 MINT REAL TOKENS'}
            </button>
          </form>
        </div>
      )}

      {/* REAL Transaction History */}
      {transactions.length > 0 && (
        <div className="backdrop-blur-md bg-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            REAL Blockchain Transactions
          </h3>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold">
                      {tx.type === 'mint' ? '🔥 Minted' : '💸 Transfer'} {tx.amount} PTK
                    </p>
                    <p className="text-white/70 text-sm">
                      {tx.type === 'mint' ? `To: ${tx.recipient?.slice(0, 6)}...${tx.recipient?.slice(-4)}` : 
                       `${tx.from?.slice(0, 6)}...${tx.from?.slice(-4)} → ${tx.to?.slice(0, 6)}...${tx.to?.slice(-4)}`}
                    </p>
                    <p className="text-white/50 text-xs">{tx.timestamp}</p>
                  </div>
                  <a 
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View TX ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isOwner && (
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-400/30 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-yellow-300">
              You are not the contract owner. Only the contract owner can mint tokens.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTokenPanel;
