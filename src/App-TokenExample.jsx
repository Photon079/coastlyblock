import React from 'react';
import AdminTokenPanel from './components/AdminTokenPanel';
import './App.css';

// Example App component showing how to integrate the token functionality
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold text-center mb-8">
          NGO Project Token Management
        </h1>
        <p className="text-lg text-center mb-8 text-gray-600">
          Manage ProjectTokens (PTK) for approved NGO projects
        </p>
      </header>

      <main className="container mx-auto px-4">
        <AdminTokenPanel />
        
        {/* Instructions */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>NGO Registration:</strong> NGOs register on the platform and provide their wallet address
            </li>
            <li>
              <strong>Project Submission:</strong> NGOs submit their projects for approval
            </li>
            <li>
              <strong>Admin Review:</strong> Admin reviews and approves worthy projects
            </li>
            <li>
              <strong>Token Minting:</strong> When approved, admin mints PTK tokens to the NGO's wallet
            </li>
            <li>
              <strong>Token Usage:</strong> NGOs can use tokens for project funding or transfer to other addresses
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">For Admins (Using Ethers.js):</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Connect with the wallet that deployed the contract to access admin functions</li>
              <li>Use "Mint Tokens" to reward individual NGOs using ethers.js</li>
              <li>Use "Batch Mint" to approve multiple projects at once with ethers.js</li>
              <li>Monitor total supply and token distribution via ethers.js contract calls</li>
              <li>All transactions are handled through ethers.js BrowserProvider</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">For NGOs:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Connect your registered wallet to view your token balance</li>
              <li>Transfer tokens to other addresses as needed</li>
              <li>Monitor your token transactions on Etherscan</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
