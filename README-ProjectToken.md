# ProjectToken (PTK) - ERC20 Smart Contract

A comprehensive ERC20 token implementation for NGO project funding using OpenZeppelin contracts, deployable on Ethereum Sepolia testnet.

## ⚡ Zero-to-Local Quickstart (No prior setup)

Follow these steps to run everything locally, deploy the smart contract to a local blockchain, open the website, be the admin, and mint tokens.

### 0) Install essentials
- **Node.js LTS**: https://nodejs.org (includes npm)
- **Git**: https://git-scm.com/downloads
- **MetaMask** browser extension: https://metamask.io

### 1) Get the code and install dependencies
```bash
git clone <your-repo-url>
cd The-bit-Ninjas-
npm install
```

### 2) Start a local blockchain (Hardhat node)
- Keep this terminal open; it prints 20 funded accounts and their private keys.
```bash
npm run node
```

### 3) Import the admin account into MetaMask
- In the Hardhat node terminal output, copy the **first account's private key**.
- In MetaMask: Account menu → Import account → Paste private key → Import.
- This imported account will be the admin, because `scripts/deploy.js` deploys with the first signer returned by Hardhat (`ethers.getSigners()`), i.e., the first local account.

### 4) Add the Hardhat network to MetaMask (only once)
If it doesn’t auto-add, add it manually:
- Network name: Hardhat Local
- New RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency Symbol: `ETH`

### 5) Deploy the contract to the local blockchain
- Open a new terminal in the project folder (keep the node running in the other terminal):
```bash
npm run deploy:local
```
This generates deployment artifacts in `deployments/` such as `hardhat-deployment.json` and `ProjectToken-ABI.json`.

### 6) Make the frontend see the deployed address
The frontend (`src/utils/ethersService.js`) tries to fetch `/deployments/hardhat-deployment.json` at runtime.

Create the public directory and copy the files so Vite can serve them:
```bash
# Windows PowerShell
mkdir -Force public\deployments
Copy-Item deployments\hardhat-deployment.json public\deployments\hardhat-deployment.json -Force
Copy-Item deployments\ProjectToken-ABI.json public\deployments\ProjectToken-ABI.json -Force
```

Notes:
- The fetch path is `/deployments/...`, so files must exist under `public/deployments/` to be served by Vite.
- If you redeploy, copy again to refresh the address.

### 7) Start the website (Vite dev server)
```bash
npm run dev
```
Open the printed local URL (e.g., `http://localhost:5173`).

### 8) Connect as admin and mint tokens
- Click "Connect Wallet" in the app (use the imported Hardhat account).
- Ensure MetaMask is on the Hardhat network (`Chain ID 31337`).
- As the deployer/admin, open the admin panel (e.g., `src/components/AdminTokenPanel.jsx`).
- Enter a recipient (you can use your own address) and an amount (e.g., `100`).
- Click Mint. You should see the transaction confirm and the recipient balance increase.

### Troubleshooting (local)
- **No deployed ProjectToken contract found**: Ensure `npm run node` is running and step 6 copy was done.
- **Wrong address picked up**: Clear the browser’s `localStorage` key `ptkAddress` and refresh, then redo step 6.
- **MetaMask connected to wrong network**: Switch to Hardhat Local or add it via step 4.

## 🚀 Features

- **ERC20 Compliant**: Standard token functionality with 18 decimals
- **Owner-Only Minting**: Only contract owner (admin) can mint new tokens
- **Batch Minting**: Mint tokens to multiple addresses in a single transaction
- **NGO Integration**: Designed for rewarding NGOs when projects are approved
- **MetaMask Integration**: Frontend components for easy wallet interaction
- **Sepolia Testnet Ready**: Configured for Ethereum Sepolia deployment

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Sepolia testnet ETH for deployment and transactions

## 🛠️ Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_private_key_without_0x_prefix
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## 🔧 Smart Contract Deployment

### 1. Compile the Contract
```bash
npm run compile
```

### 2. Deploy to Local Network (for testing)
```bash
# Start local Hardhat node
npm run node

# In another terminal, deploy to local network
npm run deploy:local
```

### 3. Deploy to Sepolia Testnet
```bash
npm run deploy:sepolia
```

After deployment, you'll see output like:
```
✅ ProjectToken deployed successfully!
📍 Contract address: 0x1234567890123456789012345678901234567890
👤 Contract owner: 0xYourWalletAddress
```

### 4. Update Frontend Configuration

After deployment, update the contract address in your frontend:

1. Copy the deployed contract address
2. Update `PROJECT_TOKEN_ADDRESS` in `src/utils/web3.js`
3. Or set it as an environment variable: `REACT_APP_PROJECT_TOKEN_ADDRESS`

## 🎯 Contract Functions

### Admin Functions (Owner Only)

- `mint(address to, uint256 amount)` - Mint tokens to a specific address
- `batchMint(address[] recipients, uint256[] amounts)` - Mint tokens to multiple addresses
- `transferOwnership(address newOwner)` - Transfer contract ownership

### Standard ERC20 Functions

- `transfer(address to, uint256 amount)` - Transfer tokens
- `approve(address spender, uint256 amount)` - Approve spending
- `balanceOf(address account)` - Check token balance
- `totalSupply()` - Get total token supply

## 🌐 Frontend Integration

### 1. Basic Usage

```javascript
import web3Service from './utils/web3';

// Connect wallet
const connection = await web3Service.connectWallet();
console.log('Connected:', connection.address);

// Check if user is admin
const isAdmin = await web3Service.isOwner();

// Mint tokens (admin only)
if (isAdmin) {
  await web3Service.mintTokens('0xNGOAddress', '100'); // 100 PTK
}

// Transfer tokens
await web3Service.transferTokens('0xRecipientAddress', '10'); // 10 PTK
```

### 2. React Component

Use the provided `AdminTokenPanel` component:

```jsx
import AdminTokenPanel from './components/AdminTokenPanel';

function App() {
  return (
    <div>
      <AdminTokenPanel />
    </div>
  );
}
```

## 🏗️ Project Structure

```
├── contracts/
│   └── ProjectToken.sol          # Main ERC20 contract
├── scripts/
│   └── deploy.js                 # Deployment script
├── src/
│   ├── components/
│   │   └── AdminTokenPanel.jsx   # React admin interface
│   ├── utils/
│   │   └── web3.js              # Web3 service layer
│   └── App-TokenExample.jsx     # Example integration
├── deployments/                  # Deployment artifacts (auto-generated)
├── hardhat.config.js            # Hardhat configuration
└── .env.example                 # Environment variables template
```

## 🔄 NGO Workflow Integration

### 1. NGO Registration
- NGO provides wallet address during registration
- Store wallet address in your database

### 2. Project Approval Process
```javascript
// When admin approves a project
const ngoWalletAddress = "0x..."; // From database
const rewardAmount = "100"; // PTK tokens

// Mint tokens to NGO
await web3Service.mintTokens(ngoWalletAddress, rewardAmount);
```

### 3. Batch Approval
```javascript
// Approve multiple projects at once
const approvedProjects = [
  { ngoAddress: "0x...", amount: "100" },
  { ngoAddress: "0x...", amount: "150" },
  { ngoAddress: "0x...", amount: "200" }
];

const addresses = approvedProjects.map(p => p.ngoAddress);
const amounts = approvedProjects.map(p => p.amount);

await web3Service.batchMintTokens(addresses, amounts);
```

## 🔍 Verification

### Verify Contract on Etherscan
```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "DEPLOYER_ADDRESS"
```

### Check Deployment
```bash
# Check contract on Sepolia Etherscan
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

## 🧪 Testing

Create test files in the `test/` directory:

```javascript
// test/ProjectToken.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProjectToken", function () {
  it("Should mint tokens correctly", async function () {
    // Test implementation
  });
});
```

Run tests:
```bash
npm run test
```

## 🔐 Security Considerations

1. **Private Key Security**: Never commit private keys to version control
2. **Owner Privileges**: Only trusted admin addresses should be contract owners
3. **Amount Validation**: Frontend validates token amounts before transactions
4. **Network Verification**: Always verify you're on the correct network
5. **Gas Estimation**: Monitor gas costs for batch operations

## 📊 Monitoring & Analytics

### Event Listening
```javascript
// Listen for token minting events
web3Service.setupEventListeners(
  (mintEvent) => {
    console.log(`Tokens minted: ${mintEvent.amount} PTK to ${mintEvent.recipient}`);
    // Update your database/UI
  },
  (transferEvent) => {
    console.log(`Transfer: ${transferEvent.amount} PTK from ${transferEvent.from} to ${transferEvent.to}`);
  }
);
```

### Transaction Tracking
- All transactions are recorded on the blockchain
- Use Etherscan API to fetch transaction history
- Monitor contract events for real-time updates

## 🚨 Troubleshooting

### Common Issues

1. **"Insufficient funds for gas"**
   - Ensure you have enough Sepolia ETH
   - Get testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

2. **"Contract not deployed"**
   - Verify contract address is correct
   - Check if you're on the right network (Sepolia)

3. **"Only owner can call this function"**
   - Ensure you're connected with the deployer wallet
   - Check ownership with `web3Service.isOwner()`

4. **MetaMask connection issues**
   - Refresh the page
   - Reset MetaMask connection
   - Switch to Sepolia network manually

### Debug Commands
```bash
# Check Hardhat network status
npx hardhat node

# Verify contract compilation
npx hardhat compile

# Check deployment status
npx hardhat run scripts/deploy.js --network sepolia
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Hardhat documentation
- Check OpenZeppelin documentation
- Create an issue in the repository

---

**Happy coding! 🚀**
