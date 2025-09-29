import React, { useState, useEffect } from 'react';
import ethersService from '../utils/ethersService';

const WorkingTokenPanel = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const connectWallet = async () => {
    try {
      setLoading(true);
      
      // REAL blockchain connection
      const connection = await ethersService.connectWallet();
      setIsConnected(true);
      
      alert(`🎉 REAL BLOCKCHAIN CONNECTED!

✅ Address: ${connection.address}
🌐 Network: ${connection.network.name}
🔗 Chain ID: ${connection.network.chainId}

You're now connected to the LIVE smart contract!`);
      
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('❌ Connection failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // REAL blockchain minting
      const result = await ethersService.mintTokens(recipientAddress, mintAmount);
      
      // Show REAL transaction details
      alert(`🎉 REAL BLOCKCHAIN SUCCESS!

✅ Tokens minted on blockchain!
📍 Recipient: ${recipientAddress}
💰 Amount: ${mintAmount} PTK
🔗 TX Hash: ${result.transactionHash}
🧱 Block: ${result.blockNumber}
⛽ Gas Used: ${result.gasUsed}

🌐 View on Explorer: 
http://localhost:8545 (Hardhat)

The tokens are NOW in the NGO's wallet!`);
      
      // Clear form
      setRecipientAddress('');
      setMintAmount('');
      
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">ProjectToken Management</h2>
        <p className="text-white/70">Mint PTK tokens for approved NGO projects</p>
      </div>

      {/* Connection Status */}
      <div className="backdrop-blur-md bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-2 text-emerald-300 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Wallet Connected
        </h3>
        <p className="text-emerald-200">Ready to mint tokens for NGO projects!</p>
      </div>

      {/* Token Info */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Token Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Token Name</p>
            <p className="text-white">ProjectToken</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Symbol</p>
            <p className="text-white">PTK</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Contract</p>
            <p className="text-white font-mono text-xs">0x5FbD...0aa3</p>
          </div>
        </div>
      </div>

      {/* Mint Tokens */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Mint Tokens for NGO
        </h3>
        <form onSubmit={handleMint} className="space-y-4 max-w-md">
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

      {/* Instructions */}
      <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
        <h3 className="text-white mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Next Steps:
        </h3>
        <ol className="text-blue-300 space-y-2 text-sm">
          <li>1. Add Hardhat network to MetaMask (Chain ID: 31337)</li>
          <li>2. Import test account with 10,000 ETH</li>
          <li>3. Start minting tokens for approved NGO projects!</li>
        </ol>
      </div>
    </div>
  );
};

export default WorkingTokenPanel;
