// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PlaNFT is ERC721 {

	uint256 constant public PLANFT_PRICE = 100e18;

	uint256 public lastId;

	address public plaNFTSeed;

	// TODO: Metadata


	constructor(address _plaNFTSeed) ERC721("PlaNFT", "PNFT") {
		plaNFTSeed = _plaNFTSeed;
	}


	function growPlaNFT() external {
		// Transfer funds
		IERC20(plaNFTSeed).transferFrom(msg.sender, address(this), PLANFT_PRICE);

		// Mint PlaNFT for caller
		_mint(msg.sender, ++lastId);
	}

}
