# ProjectToken (PTK) — Local Run Guide Only

This README intentionally contains only the steps to run the project locally with a Hardhat node and the Vite dev server.

## 1) Install
- Install Node.js LTS: https://nodejs.org
- Install Git: https://git-scm.com/downloads
- Install MetaMask extension: https://metamask.io
- In the project folder:
```bash
npm install
```

## 2) Start local blockchain (Hardhat)
Keep this terminal open; it prints funded accounts and private keys.
```bash
npm run node
```

## 3) Import admin account in MetaMask
- From the Hardhat node output, copy the first private key.
- MetaMask → Account menu → Import account → paste private key → Import.
- This becomes the admin (deployer) for local.

## 4) Add Hardhat network to MetaMask (if needed)
- Network name: Hardhat Local
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency Symbol: `ETH`

## 5) Deploy contract to local
Open a new terminal (keep node running):
```bash
npm run deploy:local
```
This creates `deployments/hardhat-deployment.json` and `deployments/ProjectToken-ABI.json`.

## 6) Expose deployment files to the frontend
The app loads `/deployments/hardhat-deployment.json` at runtime. Copy files to `public/deployments/` so Vite can serve them.
```powershell
mkdir -Force public\deployments
Copy-Item deployments\hardhat-deployment.json public\deployments\hardhat-deployment.json -Force
Copy-Item deployments\ProjectToken-ABI.json public\deployments\ProjectToken-ABI.json -Force
```

## 7) Start the website
```bash
npm run dev
```
Open the printed URL (e.g., `http://localhost:5173`). Connect MetaMask to Hardhat.

## 8) Mint tokens as admin (UI)
- Click Connect Wallet (use the imported Hardhat account)
- Open the admin mint UI (`src/components/AdminTokenPanel.jsx`)
- Enter recipient and amount (e.g., `100`) → Mint

## Troubleshooting (local)
- Ensure `npm run node` is running
- If contract not found, redo deploy and copy step (5) and (6)
- If wrong address is used, clear `localStorage` key `ptkAddress` and refresh
