const { expect } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { ethers } = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

let USDC,
  usdc,
  MMP,
  mmp,
  MMP_IDO,
  mmp_ido,
  mmp_owner,
  mmp_ido_owner,
  user1,
  user2,
  usdc_by_user1,
  usdc_by_user2,
  mmp_ido_by_owner,
  mmp_ido_by_user1,
  mmp_ido_by_user2;

beforeEach(async () => {
  [mmp_owner, mmp_ido_owner, user1, user2] = await ethers.getSigners();

  USDC = await ethers.getContractFactory("USDC");
  usdc = await USDC.deploy(mmp_owner.address);
  await usdc.deployed();

  MMP = await ethers.getContractFactory("MMP");
  mmp = await MMP.deploy(mmp_owner.address);
  await mmp.deployed();

  MMP_IDO = await ethers.getContractFactory("MMP_IDO");
  mmp_ido = await MMP_IDO.deploy(
    mmp.address,
    usdc.address,
    mmp_ido_owner.address
  );
  await mmp_ido.deployed();

  usdc_by_user1 = usdc.connect(user1);
  usdc_by_user2 = usdc.connect(user2);
  mmp_by_owner = mmp.connect(mmp_owner);
  mmp_ido_by_owner = mmp_ido.connect(mmp_ido_owner);
  mmp_ido_by_user1 = mmp_ido.connect(user1);
  mmp_ido_by_user2 = mmp_ido.connect(user2);

  await mmp_by_owner.transfer(mmp_ido.address, "30000000000000000000000000000"); // 300 million
  await usdc.transfer(user1.address, "1000000000000000000000000"); // 100W
  await usdc.transfer(user2.address, "1000000000000000000000000"); // 100W
});

describe("MMP", async function () {
  it("Should USDC deplyed", async function () {
    expect(await usdc.symbol()).to.equal("USDC");
  });

  it("Should MMP deplyed", async function () {
    expect(await mmp.symbol()).to.equal("MMP");
  });

  it("MMP owner right balance ", async function () {
    expect(await mmp.balanceOf(mmp_owner.address)).to.equal(
      "70000000000000000000000000000"
    );
  });

  it("MMP_IDO has right supply ", async function () {
    expect(await mmp.balanceOf(mmp_ido.address)).to.equal(
      "30000000000000000000000000000"
    );
  });

  it("Should MMP_IDO deplyed", async function () {
    expect(await mmp_ido.owner.call()).to.equal(mmp_ido_owner.address);
    expect(await mmp_ido.usdc.call()).to.equal(usdc.address);
    expect(await mmp_ido.mmp.call()).to.equal(mmp.address);
    expect(await mmp_ido.depositedAmount()).to.equal(0);
    expect(await mmp_ido.price()).to.equal(0);
  });

  it("MMP_IDO deposit status confirm", async function () {
    expect(await mmp_ido.isDepositOpen()).to.equal(false);
    await mmp_ido_by_owner.toggleDepositOpen();
    expect(await mmp_ido.isDepositOpen()).to.equal(true);
    await mmp_ido_by_owner.toggleDepositOpen();
    expect(await mmp_ido.isDepositOpen()).to.equal(false);
  });

  it("MMP_IDO claim status confirm", async function () {
    expect(await mmp_ido.isClaimOpen()).to.equal(false);
    await mmp_ido_by_owner.toggleClaimOpen();
    expect(await mmp_ido.isClaimOpen()).to.equal(true);
    await mmp_ido_by_owner.toggleClaimOpen();
    expect(await mmp_ido.isClaimOpen()).to.equal(false);
  });

  it("MMP_IDO deposit and claim", async function () {
    // deposit
    try {
      await mmp_ido_by_user1.deposit("1");
    } catch (e) {
      expect(e.message).to.match(/deposit is not open/);
    }

    await mmp_ido_by_owner.toggleDepositOpen();

    try {
      await mmp_ido_by_user1.deposit("500000000000000000000");
    } catch (e) {
      expect(e.message).to.match(/transfer amount exceeds allowance/);
    }

    await usdc_by_user1.approve(mmp_ido.address, "100000000000000000000");
    await mmp_ido_by_user1.deposit("100000000000000000000");
    expect(await mmp_ido_by_user1.depositedAmount()).to.equal(
      "100000000000000000000"
    );

    await usdc_by_user1.approve(mmp_ido.address, "400000000000000000000");
    await mmp_ido_by_user1.deposit("400000000000000000000");
    expect(await mmp_ido_by_user1.depositedAmount()).to.equal(
      "500000000000000000000" // 500U
    );

    try {
      await mmp_ido_by_user1.deposit("1");
    } catch (e) {
      expect(e.message).to.match(/limit deposit amount/);
    }

    await mmp_ido_by_owner.setWhitelist([user2.address]);
    await usdc_by_user2.approve(mmp_ido.address, "2000000000000000000000");
    await mmp_ido_by_user2.deposit("2000000000000000000000");
    expect(await mmp_ido_by_user2.depositedAmount()).to.equal(
      "2000000000000000000000"
    );

    // Claim

    try {
      await mmp_ido_by_user1.claim();
    } catch (e) {
      expect(e.message).to.match(/claim is not open/);
    }

    await mmp_ido_by_owner.toggleClaimOpen();

    console.log((await mmp_ido_by_user1.price()).toString());
    console.log((await mmp_ido_by_user1.claimAmount()).toString());
    console.log((await mmp_ido_by_user2.claimAmount()).toString());

    // expect((await mmp_ido_by_user1.claimAmount()).toString()).to.equal("0");
  });
});
