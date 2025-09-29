import React, { useState, useEffect } from 'react';
import ethersService from '../utils/ethersService';

const AdminTokenPanel = () => {
  const [isConnected, setIsConnected] = useState(true); // Always show panel; we will attempt silent connect
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
    // Attempt a silent connection if wallet is available; do not show any connect button
    (async () => {
      try {
        if (!ethersService.userAddress && window?.ethereum) {
          await ethersService.connectWallet();
        }
      } catch (_) {
        // Ignore - panel should still render without explicit connect UI
      } finally {
        await checkConnection();
      }
    })();
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

  // Removed explicit connect wallet flow per requirement

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

  const handleMint = async (e) => {
    e.preventDefault();
    if (!recipientAddress || !mintAmount) {
      alert('Please fill in all fields');
      return;
    }

    // Prevent minting to the contract address (common mistake)
    const contractAddr = ethersService.getResolvedAddress?.();
    if (contractAddr && recipientAddress && recipientAddress.toLowerCase() === contractAddr.toLowerCase()) {
      alert('Recipient cannot be the contract address. Please enter the NGO wallet address.');
      return;
    }

    try {
      setLoading(true);
      const result = await ethersService.mintTokens(recipientAddress, mintAmount);
      alert(`Tokens minted successfully!\nRecipient: ${result.recipientResolved || recipientAddress}\nAmount: ${result.amountResolved || mintAmount} PTK\nTx: ${result.transactionHash}`);
      setRecipientAddress('');
      setMintAmount('');
      await loadUserData();
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchMint = async (e) => {
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
      alert('Batch minting failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
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
      alert('Transfer failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addBatchRecipient = () => {
    setBatchRecipients([...batchRecipients, { address: '', amount: '' }]);
  };

  const removeBatchRecipient = (index) => {
    setBatchRecipients(batchRecipients.filter((_, i) => i !== index));
  };

  const updateBatchRecipient = (index, field, value) => {
    const updated = [...batchRecipients];
    updated[index][field] = value;
    setBatchRecipients(updated);
  };

  // Always render the panel; no explicit connect screen

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">ProjectToken Admin Panel</h2>
      
      {/* User Info */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Wallet Information</h3>
        <p><strong>Address:</strong> {userAddress || 'Connected'}</p>
        <p><strong>ETH Balance:</strong> {parseFloat(ethBalance).toFixed(4)} ETH</p>
        <p><strong>PTK Balance:</strong> {parseFloat(userBalance).toFixed(4)} PTK</p>
        <p><strong>Admin Status:</strong> {isOwner ? '✅ Contract Owner' : '❌ Not Owner'}</p>
      </div>

      {/* Token Info */}
      {tokenInfo && (
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Token Information</h3>
          <p><strong>Name:</strong> {tokenInfo.name}</p>
          <p><strong>Symbol:</strong> {tokenInfo.symbol}</p>
          <p><strong>Decimals:</strong> {tokenInfo.decimals}</p>
          <p><strong>Total Supply:</strong> {parseFloat(tokenInfo.totalSupply).toFixed(4)} PTK</p>
        </div>
      )}

      {/* Admin Functions */}
      {isOwner && (
        <div className="space-y-6">
          {/* Single Mint */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Mint Tokens (Single)</h3>
            <form onSubmit={handleMint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">NGO Wallet Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (PTK)</label>
                <input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  placeholder="100"
                  step="0.01"
                  min="0"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Minting...' : 'Mint Tokens'}
              </button>
            </form>
          </div>

          {/* Batch Mint */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Batch Mint Tokens</h3>
            <form onSubmit={handleBatchMint} className="space-y-4">
              {batchRecipients.map((recipient, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={recipient.address}
                    onChange={(e) => updateBatchRecipient(index, 'address', e.target.value)}
                    placeholder="NGO Wallet Address"
                    className="flex-1 p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    value={recipient.amount}
                    onChange={(e) => updateBatchRecipient(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    step="0.01"
                    min="0"
                    className="w-32 p-2 border rounded-md"
                  />
                  {batchRecipients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBatchRecipient(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addBatchRecipient}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Recipient
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? 'Batch Minting...' : 'Batch Mint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Tokens (Available to all users) */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Transfer Tokens</h3>
        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Recipient Address</label>
            <input
              type="text"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount (PTK)</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="10"
              step="0.01"
              min="0"
              max={userBalance}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || parseFloat(userBalance) === 0}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Transferring...' : 'Transfer Tokens'}
          </button>
        </form>
      </div>

      {!isOwner && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
          <p className="text-yellow-800">
            ⚠️ You are not the contract owner. You can only transfer tokens, not mint them.
          </p>
        </div>
      )}
    </div>
  );
};

export { AdminTokenPanel };
export default AdminTokenPanel;
