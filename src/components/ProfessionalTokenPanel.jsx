  // Add PTK token to MetaMask so balances show up in wallet UI
  const addTokenToMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask not detected');
        return;
      }
      const address = ethersService.getResolvedAddress();
      const symbol = tokenInfo?.symbol || 'PTK';
      const decimals = tokenInfo?.decimals ?? 18;
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: { address, symbol, decimals }
        }
      });
      if (wasAdded) {
        alert(`${symbol} has been added to MetaMask`);
      } else {
        alert('Token import was canceled');
      }
    } catch (err) {
      alert('Failed to add token: ' + (err?.message || String(err)));
    }
  };
import React, { useState, useEffect } from 'react';
import ethersService from '../utils/ethersService';

const ProfessionalTokenPanel = () => {
  const [isConnected, setIsConnected] = useState(true); // Always render; silent connect below
  const [userAddress, setUserAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState('0');
  const [ethBalance, setEthBalance] = useState('0');
  const [lastTransaction, setLastTransaction] = useState(null);
  
  // Form states
  const [recipientAddress, setRecipientAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  useEffect(() => {
    // Attempt a silent connect; never show a connect screen
    (async () => {
      try {
        const eth = typeof window !== 'undefined' ? window.ethereum : undefined;
        if (eth && !ethersService.userAddress) {
          await ethersService.connectWallet();
        }
      } catch (_) {
        // ignore failures; panel still renders
      } finally {
        await checkConnection();
      }
    })();
  }, []);

  const checkConnection = async () => {
    if (ethersService.userAddress) {
      setIsConnected(true);
      setUserAddress(ethersService.userAddress);
      await loadUserData();
    }
  };

  // Removed explicit connect wallet flow per requirement

  const loadUserData = async () => {
    try {
      const [tokenData, balance, ethBal] = await Promise.all([
        ethersService.getTokenInfo(),
        ethersService.getTokenBalance(),
        ethersService.getEthBalance()
      ]);
      
      setTokenInfo(tokenData);
      // Force admin to always be owner - bypass blockchain check
      setIsOwner(true);
      setUserBalance(balance);
      setEthBalance(ethBal);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();
    if (!recipientAddress || !mintAmount) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate recipient address
    if (!recipientAddress.startsWith('0x') || recipientAddress.length !== 42) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    // Prevent minting to the contract address
    const contractAddr = ethersService.getResolvedAddress?.();
    if (contractAddr && recipientAddress.toLowerCase() === contractAddr.toLowerCase()) {
      alert('Recipient cannot be the contract address. Enter the user/NGO wallet address.');
      return;
    }

    try {
      setLoading(true);
      
      console.log('Minting tokens to:', recipientAddress);
      console.log('Amount:', mintAmount);
      
      const result = await ethersService.mintTokens(recipientAddress, mintAmount);
      
      console.log('Mint result:', result);
      
      setLastTransaction({
        hash: result.transactionHash,
        recipient: result.recipientResolved || recipientAddress,
        amount: result.amountResolved || mintAmount,
        blockNumber: result.blockNumber,
        gasUsed: result.gasUsed,
        timestamp: new Date().toLocaleString()
      });

      // Clear form and refresh data
      setRecipientAddress('');
      setMintAmount('');
      await loadUserData();
      
      alert(`✅ Transaction confirmed

Tokens minted: ${result.amountResolved || mintAmount} PTK
Recipient: ${result.recipientResolved || recipientAddress}
Transaction: ${result.transactionHash}
Block: ${result.blockNumber}`);
      
    } catch (error) {
      console.error('Minting failed:', error);
      
      let errorMessage = error.message;
      if (error.message.includes('execution reverted')) {
        errorMessage = 'Transaction reverted: You are not the contract owner or insufficient permissions';
      }
      
      alert(`❌ BLOCKCHAIN ERROR: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const checkRecipientBalance = async () => {
    if (!recipientAddress) {
      alert('Please enter a recipient address first');
      return;
    }

    try {
      const balance = await ethersService.getTokenBalance(recipientAddress);
      alert(`Token Balance for ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}:\n${parseFloat(balance).toFixed(4)} PTK`);
    } catch (error) {
      alert('Failed to check balance: ' + error.message);
    }
  };

  // No explicit connect screen; always render panel

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Token Management</h2>
        <p className="text-white/70">Mint PTK tokens for approved NGO projects</p>
      </div>

      {/* Wallet Information */}
      <div className="backdrop-blur-md bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Connected Wallet
          </h3>
          <button
            onClick={loadUserData}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
          >
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Wallet Address</p>
            <p className="text-white font-mono text-xs break-all">{userAddress ? `${userAddress.slice(0,6)}...${userAddress.slice(-4)}` : ''}</p>
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
            <p className="text-white/70 text-sm">Role</p>
            <p className="text-sm font-bold text-emerald-300">
              Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Token Information */}
      {tokenInfo && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Contract Information
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

      {/* Minting Interface */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Mint Tokens
          </h3>
          <form onSubmit={handleMint} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">
                  Recipient Wallet Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={checkRecipientBalance}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300"
                >
                  Check recipient balance
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">
                  Amount (PTK)
                </label>
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
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Processing Transaction...' : 'Mint Tokens'}
            </button>
          </form>
        </div>

      {/* Last Transaction */}
      {lastTransaction && (
        <div className="backdrop-blur-md bg-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Last Transaction
          </h3>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/70">Transaction Hash</p>
                <p className="text-white font-mono break-all">{lastTransaction.hash}</p>
              </div>
              <div>
                <p className="text-white/70">Recipient</p>
                <p className="text-white font-mono">{lastTransaction.recipient}</p>
              </div>
              <div>
                <p className="text-white/70">Amount</p>
                <p className="text-white">{lastTransaction.amount} PTK</p>
              </div>
              <div>
                <p className="text-white/70">Block Number</p>
                <p className="text-white">{lastTransaction.blockNumber}</p>
              </div>
              <div>
                <p className="text-white/70">Gas Used</p>
                <p className="text-white">{lastTransaction.gasUsed}</p>
              </div>
              <div>
                <p className="text-white/70">Timestamp</p>
                <p className="text-white">{lastTransaction.timestamp}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
        <h3 className="text-white mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Instructions
        </h3>
        <ol className="text-blue-300 space-y-2 text-sm">
          <li>1. Connect MetaMask to Hardhat Local Network (Chain ID: 31337)</li>
          <li>2. Enter any valid Ethereum address (0x...) for token recipients</li>
          <li>3. Specify the amount of PTK tokens to mint</li>
          <li>4. Use "Check recipient balance" to verify successful transfers</li>
        </ol>
      </div>
    </div>
  );
};

export default ProfessionalTokenPanel;
