const hardhat = require("hardhat");


async function main() {

	const addr = "0x...";
	const amount = hardhat.ethers.BigNumber.from(10).pow(18).mul(100_000);

	console.log(` ⏳ Minting ${amount.toString()} seed tokens to ${addr}`);

	const plaNFTSeed = await hardhat.ethers.getContractAt("PlaNFTSeed", "0x204b870D50DDC407CC27485777A6302a321fc72b");

	await plaNFTSeed.mint(addr, amount);

	console.log(` 🎉 Seed token minted`);

}


main()
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
