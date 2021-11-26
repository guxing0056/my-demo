const hre = require("hardhat");

async function main() {
  const USDT_TEST = "0xb9050803f2618eaf19cf3f985092e9c62068ea21";
  const MMP_TEST = "0xc3d1072c94f1b0f32d1e12ac8d12c0599b475fbd";
  const MMP_IDO = await ethers.getContractFactory("MMP_IDO");
  const mmp_ido = await MMP_IDO.deploy(
    MMP_TEST,
    USDT_TEST,
    "0x4D27333Fd665C94BC3Fe62a391FE16d156C71474"
  );
  await mmp_ido.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
