const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");


function withDecimals(number) {
	return ethers.BigNumber.from(10).pow(18).mul(number);
}


describe("PlaNFTSeed", function() {

	let Seed, seed;
	let admin, otherAdmin, other;

	before(async function() {
		Seed = await ethers.getContractFactory("PlaNFTSeed");

		[admin, otherAdmin, other] = await ethers.getSigners();
	});

	beforeEach(async function() {
		seed = await Seed.deploy();
		await seed.deployed();
	});


	describe("constructor", function() {

		it("Should grant deployer admin role", async function() {
			seed = await Seed.connect(otherAdmin).deploy();
			await seed.deployed();

			expect(await seed.hasRole(await seed.DEFAULT_ADMIN_ROLE(), otherAdmin.address)).to.equal(true);
		});

		it("Should grant deployer seed minter role", async function() {
			seed = await Seed.connect(otherAdmin).deploy();
			await seed.deployed();

			expect(await seed.hasRole(await seed.SEED_MINTER(), otherAdmin.address)).to.equal(true);
		});

	});


	describe("grantRole", function() {

		it("Should enable to grant role to other address", async function() {
			await expect(
				seed.connect(other).mint(other.address, 100)
			).to.have.been.reverted;

			await seed.grantRole(await seed.SEED_MINTER(), other.address);

			await expect(
				seed.connect(other).mint(other.address, 100)
			).to.not.have.been.reverted;
		});

	});


	describe("mint", function() {

		it("Should fail if caller hasn't seed minter role", async function() {
			await expect(
				seed.connect(other).mint(other.address, 100)
			).to.have.been.reverted;
		});

		it("Should mint tokens to an address", async function() {
			await seed.mint(other.address, 100);

			expect(await seed.balanceOf(other.address)).to.equal(100);
		});

	});

});
