const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting ProjectToken deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
  
  // Get the contract factory
  const ProjectToken = await ethers.getContractFactory("ProjectToken");
  
  // Deploy the contract with the deployer as the initial owner
  console.log("⏳ Deploying ProjectToken contract...");
  const projectToken = await ProjectToken.deploy(deployer.address);
  
  // Wait for deployment to complete
  await projectToken.waitForDeployment();
  const contractAddress = await projectToken.getAddress();
  
  console.log("✅ ProjectToken deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("👤 Contract owner:", deployer.address);
  
  // Verify contract details
  const name = await projectToken.name();
  const symbol = await projectToken.symbol();
  const decimals = await projectToken.decimals();
  const totalSupply = await projectToken.totalSupply();
  
  console.log("\n📊 Contract Details:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Decimals:", decimals);
  console.log("   Total Supply:", ethers.formatEther(totalSupply), "PTK");
  
  // Save deployment information
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    contractName: "ProjectToken",
    symbol: symbol,
    decimals: decimals.toString(),
    transactionHash: projectToken.deploymentTransaction()?.hash,
    blockNumber: projectToken.deploymentTransaction()?.blockNumber,
  };
  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment info to file
  const deploymentFile = path.join(deploymentsDir, `${hre.network.name}-deployment.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);
  
  // Generate ABI file for frontend integration
  const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "ProjectToken.sol", "ProjectToken.json");
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const abiFile = path.join(deploymentsDir, "ProjectToken-ABI.json");
    fs.writeFileSync(abiFile, JSON.stringify(artifact.abi, null, 2));
    console.log("📄 ABI saved to:", abiFile);
  }
  
  // If deploying to a testnet or mainnet, provide verification instructions
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 To verify the contract on Etherscan, run:");
    console.log(`npx hardhat verify --network ${hre.network.name} ${contractAddress} "${deployer.address}"`);
  }
  
  console.log("\n🎉 Deployment completed successfully!");
  
  return {
    contractAddress,
    deployer: deployer.address,
    contract: projectToken
  };
}

// Execute deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Deployment failed:", error);
      process.exit(1);
    });
}

module.exports = main;
