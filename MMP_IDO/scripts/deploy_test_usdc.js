const hre = require("hardhat");

async function main() {
  const MMP = await ethers.getContractFactory("USDC");
  const mmp = await MMP.deploy("0x9d0dB10E5f8aF0464A6C34999eAe671b5f1EAC15");
  await mmp.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
