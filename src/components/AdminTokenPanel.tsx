import React, { useState, useEffect } from 'react';
import ethersService from '../utils/ethersService';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Coins, Wallet, Plus, Minus, AlertCircle } from 'lucide-react';

interface TokenPanelProps {
  className?: string;
}

export const AdminTokenPanel = ({ className = "" }: TokenPanelProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Single mint form
  const [recipientAddress, setRecipientAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  
  // Batch mint form
  const [batchRecipients, setBatchRecipients] = useState([{ address: '', amount: '' }]);
  
  // Transfer form
  const [transferRecipient, setTransferRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  
  // User balance
  const [userBalance, setUserBalance] = useState('0');
  const [ethBalance, setEthBalance] = useState('0');

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
        console.log('Tokens minted:', event);
        loadUserData(); // Refresh data after minting
      },
      (event) => {
        console.log('Transfer event:', event);
        loadUserData(); // Refresh data after transfer
      }
    );
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      const connection = await ethersService.connectWallet();
      setIsConnected(true);
      setUserAddress(connection.address);
      await loadUserData();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet: ' + (error as Error).message);
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

  const handleMint = async (e: any) => {
    e.preventDefault();
    if (!recipientAddress || !mintAmount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const result = await ethersService.mintTokens(recipientAddress, mintAmount);
      alert(`Tokens minted successfully! Transaction: ${result.transactionHash}`);
      setRecipientAddress('');
      setMintAmount('');
      await loadUserData();
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchMint = async (e: any) => {
    e.preventDefault();
    const validRecipients = batchRecipients.filter(r => r.address && r.amount);
    
    if (validRecipients.length === 0) {
      alert('Please add at least one valid recipient');
      return;
    }

    try {
      setLoading(true);
      const addresses = validRecipients.map(r => r.address);
      const amounts = validRecipients.map(r => r.amount);
      
      const result = await ethersService.batchMintTokens(addresses, amounts);
      alert(`Batch mint successful! Transaction: ${result.transactionHash}`);
      setBatchRecipients([{ address: '', amount: '' }]);
      await loadUserData();
    } catch (error) {
      console.error('Batch minting failed:', error);
      alert('Batch minting failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e: any) => {
    e.preventDefault();
    if (!transferRecipient || !transferAmount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const result = await ethersService.transferTokens(transferRecipient, transferAmount);
      alert(`Transfer successful! Transaction: ${result.transactionHash}`);
      setTransferRecipient('');
      setTransferAmount('');
      await loadUserData();
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addBatchRecipient = () => {
    setBatchRecipients([...batchRecipients, { address: '', amount: '' }]);
  };

  const removeBatchRecipient = (index: number) => {
    setBatchRecipients(batchRecipients.filter((_, i) => i !== index));
  };

  const updateBatchRecipient = (index: number, field: 'address' | 'amount', value: string) => {
    const updated = [...batchRecipients];
    updated[index][field] = value;
    setBatchRecipients(updated);
  };

  if (!isConnected) {
    return (
      <div className={`max-w-md mx-auto ${className}`}>
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">ProjectToken Management</h2>
            <p className="text-white/70 mb-6">
              Connect your MetaMask wallet to manage ProjectTokens (PTK)
            </p>
            <Button
              onClick={connectWallet}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              {loading ? 'Connecting...' : 'Connect MetaMask'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">ProjectToken Management</h2>
        <p className="text-white/70">Mint and manage PTK tokens for approved NGO projects</p>
      </div>

      {/* Wallet Info */}
      <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <Wallet className="w-5 h-5 mr-2" />
          Wallet Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <Badge className={isOwner ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}>
              {isOwner ? '✅ Contract Owner' : '❌ Not Owner'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Token Info */}
      {tokenInfo && (
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
            <Coins className="w-5 h-5 mr-2" />
            Token Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </Card>
      )}

      {/* Admin Functions */}
      {isOwner && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Single Mint */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Mint Tokens (Single NGO)</h3>
            <form onSubmit={handleMint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">NGO Wallet Address</label>
                <Input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Amount (PTK)</label>
                <Input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  placeholder="100"
                  step="0.01"
                  min="0"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                {loading ? 'Minting...' : 'Mint Tokens'}
              </Button>
            </form>
          </Card>

          {/* Batch Mint */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Batch Mint Tokens</h3>
            <form onSubmit={handleBatchMint} className="space-y-4">
              {batchRecipients.map((recipient, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    type="text"
                    value={recipient.address}
                    onChange={(e) => updateBatchRecipient(index, 'address', e.target.value)}
                    placeholder="NGO Wallet Address"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    type="number"
                    value={recipient.amount}
                    onChange={(e) => updateBatchRecipient(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    step="0.01"
                    min="0"
                    className="w-32 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  {batchRecipients.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeBatchRecipient(index)}
                      variant="outline"
                      size="sm"
                      className="px-3 border-red-400/30 text-red-300 hover:bg-red-500/20"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex space-x-2">
                <Button
                  type="button"
                  onClick={addBatchRecipient}
                  variant="outline"
                  className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Recipient
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {loading ? 'Batch Minting...' : 'Batch Mint'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Transfer Tokens (Available to all users) */}
      <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Transfer Tokens</h3>
        <form onSubmit={handleTransfer} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Recipient Address</label>
            <Input
              type="text"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
              placeholder="0x..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Amount (PTK)</label>
            <Input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="10"
              step="0.01"
              min="0"
              max={userBalance}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading || parseFloat(userBalance) === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {loading ? 'Transferring...' : 'Transfer Tokens'}
          </Button>
        </form>
      </Card>

      {!isOwner && (
        <Card className="backdrop-blur-md bg-yellow-500/10 border border-yellow-400/30 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <p className="text-yellow-300">
              You are not the contract owner. You can only transfer tokens, not mint them.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
