const { expect } = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");


function withDecimals(number) {
	return ethers.BigNumber.from(10).pow(18).mul(number);
}


describe("PlaNFT", function() {

	let Seed, seed;
	let Planft, planft;
	let signer;

	before(async function() {
		Seed = await ethers.getContractFactory("PlaNFTSeed");
		Planft = await ethers.getContractFactory("PlaNFT");

		[signer] = await ethers.getSigners();
	});

	beforeEach(async function() {
		seed = await Seed.deploy();
		await seed.deployed();

		planft = await Planft.deploy(seed.address);
		await planft.deployed();

		// Mint 1000 seed tokens to account
		await seed.mint(signer.address, withDecimals(1_000));
	});


	describe("growPlaNFT", function() {

		beforeEach(async function() {
			await seed.approve(planft.address, withDecimals(100));
		});


		it("Should fail if max number of tokens are minted", async function() {
			const PlanftMock = await smock.mock("PlaNFT");
			const planftMock = await PlanftMock.deploy(seed.address);
			await planftMock.setVariable("lastId", 500);

			await expect(
				planftMock.growPlaNFT()
			).to.be.revertedWith("Collection sold out");
		});

		it("Should transfer PlaNFTSeed tokens to contract", async function() {
			await planft.growPlaNFT();

			expect((await seed.balanceOf(planft.address)).toString()).to.equal(withDecimals(100).toString());
		});

		it("Should mint new token", async function() {
			await planft.growPlaNFT();

			expect(await planft.ownerOf(1)).to.equal(signer.address);
		});

	});

});
