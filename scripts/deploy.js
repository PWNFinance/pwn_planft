const hardhat = require("hardhat");


async function main() {

	console.log("Deploying PlaNFTSeed contract");

	const PlaNFTSeed = await hardhat.ethers.getContractFactory("PlaNFTSeed");

	const plaNFTSeed = await PlaNFTSeed.deploy();
	await plaNFTSeed.deployed();

	console.log(`PlaNFTSeed deploy at: ${plaNFTSeed.address}`);

	// ---

	console.log("Deploying PlaNFT contract");

	const PlaNFT = await hardhat.ethers.getContractFactory("PlaNFT");

	const plaNFT = await PlaNFT.deploy(plaNFTSeed.address);
	await plaNFT.deployed();

	console.log(`PlaNFT deploy at: ${plaNFT.address}`);

}


main()
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
