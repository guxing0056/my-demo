// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  // await greeter.deployed();

  // console.log("Greeter deployed to:", greeter.address);

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy(mmp_owner.address);
  await usdc.deployed();

  // const MMP = await ethers.getContractFactory("MMP");
  // const mmp = await MMP.deploy(mmp_owner.address);
  // await mmp.deployed();

  // const MMP_IDO = await ethers.getContractFactory("MMP_IDO");
  // const mmp_ido = await MMP_IDO.deploy(
  //   mmp.address,
  //   usdc.address,
  //   mmp_ido_owner.address
  // );
  // await mmp_ido.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
