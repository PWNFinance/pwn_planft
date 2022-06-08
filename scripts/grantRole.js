const hardhat = require("hardhat");


async function main() {

	const addr = "0x...";

	console.log(` ⏳ Granting SEED_MINTER role to ${addr}`);

	const plaNFTSeed = await hardhat.ethers.getContractAt("PlaNFTSeed", "0x19e3293196aee99BB3080f28B9D3b4ea7F232b8d");

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
