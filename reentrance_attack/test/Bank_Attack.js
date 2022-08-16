const { expect } = require("chai");

describe("Bank Attack", function () {
  it("Should drain Bank_Vulnerable", async function () {
    const Bank_Vulnerable = await ethers.getContractFactory("Bank_Vulnerable");
    const bank = await Bank_Vulnerable.deploy({ value: ethers.utils.parseEther("100") });

    const Attacker = await ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy(bank.address);

    console.log(`bank     balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    console.log();
    console.log(`Attack by depositing 1 ether and withdraw...`);
    console.log();
    await attacker.attack({ value: ethers.utils.parseEther("1") });

    console.log(`bank     balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    expect(await ethers.provider.getBalance(bank.address)).to.equal(0);
  });

  it("Should not drain Bank_Checks_Effects_Interactions", async function () {
    const Bank_Checks_Effects_Interactions = await ethers.getContractFactory("Bank_Checks_Effects_Interactions");
    const bank = await Bank_Checks_Effects_Interactions.deploy({ value: ethers.utils.parseEther("100") });

    const Attacker = await ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy(bank.address);

    console.log(`bank     balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    console.log();
    console.log(`Attack by depositing 1 ether and withdraw...`);
    console.log();

    await expect(attacker.attack({ value: ethers.utils.parseEther("1") })).to.be.revertedWith(
      "failed to send ether"
    );
    console.log("failed to send ether");
    console.log();

    console.log(`bank     balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    expect(await ethers.provider.getBalance(bank.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should not drain Bank_Reentrancy_Mutex", async function () {
    const Bank_Reentrancy_Mutex = await ethers.getContractFactory("Bank_Reentrancy_Mutex");
    const bank = await Bank_Reentrancy_Mutex.deploy({ value: ethers.utils.parseEther("100") });

    const Attacker = await ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy(bank.address);

    console.log(`bank     balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    console.log();
    console.log(`Attack by depositing 1 ether and withdraw...`);
    console.log();

    await expect(attacker.attack({ value: ethers.utils.parseEther("1") })).to.be.revertedWith(
      "failed to send ether"
    );
    console.log("failed to send ether");
    console.log();

    console.log(`bank     balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    expect(await ethers.provider.getBalance(bank.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should not drain Bank_Reentrancy_Guard", async function () {
    const Bank_Reentrancy_Guard = await ethers.getContractFactory("Bank_Reentrancy_Guard");
    const bank = await Bank_Reentrancy_Guard.deploy({ value: ethers.utils.parseEther("100") });

    const Attacker = await ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy(bank.address);

    console.log(`bank     balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance before ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    console.log();
    console.log(`Attack by depositing 1 ether and withdraw...`);
    console.log();

    await expect(attacker.attack({ value: ethers.utils.parseEther("1") })).to.be.revertedWith(
      "failed to send ether"
    );
    console.log("failed to send ether");
    console.log();

    console.log(`bank     balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))} ethers`);
    console.log(`attacker balance after ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))} ethers`);

    expect(await ethers.provider.getBalance(bank.address)).to.equal(ethers.utils.parseEther("100"));
  });
});


