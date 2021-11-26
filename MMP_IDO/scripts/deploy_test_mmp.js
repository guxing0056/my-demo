const hre = require("hardhat");

async function main() {
  const USDC = await ethers.getContractFactory("MMP");
  const usdc = await USDC.deploy("0x2596B9C7E67C2EB8078AF5C971F1bd417329858b");
  await usdc.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
