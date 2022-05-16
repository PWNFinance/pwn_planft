// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PlaNFTSeed is ERC20, AccessControl {

	bytes32 public constant SEED_MINTER = keccak256("SEED_MINTER");


	constructor() ERC20("PlaNFTSeed", "PNFTS") {
		_grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_grantRole(SEED_MINTER, msg.sender);
	}


	function mint(address owner, uint256 amount) external onlyRole(SEED_MINTER) {
		_mint(owner, amount);
	}

}
