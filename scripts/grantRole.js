const hardhat = require("hardhat");


async function main() {

	const addr = "0x...";

	console.log(` ⏳ Granting SEED_MINTER role to ${addr}`);

	const plaNFTSeed = await hardhat.ethers.getContractAt("PlaNFTSeed", "0x204b870D50DDC407CC27485777A6302a321fc72b");

	await plaNFTSeed.grantRole(await plaNFTSeed.SEED_MINTER(), addr);

	console.log(` 🎉 Role granted`);

}


main()
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
