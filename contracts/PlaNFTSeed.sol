// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IPlaNFTSeed {
	function mint(address owner, uint256 amount) external;
}

contract PlaNFTSeed is ERC20("PlaNFTSeed", "PNFTS"), Ownable, IPlaNFTSeed {

	// TODO: Metadata

	function mint(address owner, uint256 amount) override external onlyOwner {
		_mint(owner, amount);
	}

}
