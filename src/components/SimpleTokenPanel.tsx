import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Wallet, Coins } from 'lucide-react';

export function SimpleTokenPanel() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const handleMint = (e: any) => {
    e.preventDefault();
    alert(`Would mint ${mintAmount} PTK tokens to ${recipientAddress}`);
    // This will be connected to the actual smart contract later
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">ProjectToken Management</h2>
        <p className="text-white/70">Mint PTK tokens for approved NGO projects</p>
      </div>

      {/* Token Info Card */}
      <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <Coins className="w-5 h-5 mr-2" />
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
            <p className="text-white/70 text-sm">Decimals</p>
            <p className="text-white">18</p>
          </div>
        </div>
      </Card>

      {/* Mint Tokens Card */}
      <Card className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <Wallet className="w-5 h-5 mr-2" />
          Mint Tokens for NGO
        </h3>
        <form onSubmit={handleMint} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">
              NGO Wallet Address
            </label>
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
            <label className="block text-sm font-medium mb-2 text-white/70">
              Amount (PTK)
            </label>
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
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            Mint Tokens
          </Button>
        </form>
      </Card>

      {/* Instructions */}
      <Card className="backdrop-blur-md bg-blue-500/10 border border-blue-400/30 p-6">
        <h3 className="text-white mb-3">🚀 Next Steps to Enable Full Functionality:</h3>
        <ol className="text-blue-300 space-y-2 text-sm">
          <li>1. Deploy the ProjectToken smart contract to Sepolia testnet</li>
          <li>2. Update the contract address in the ethersService</li>
          <li>3. Connect MetaMask to interact with the blockchain</li>
          <li>4. Start minting tokens for approved NGO projects!</li>
        </ol>
      </Card>
    </div>
  );
}
