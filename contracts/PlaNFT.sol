// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PlaNFT is ERC721 {
	using Strings for uint256;

	uint256 constant public PLANFT_PRICE = 100e18;
	uint256 constant public MAX_PLANFT = 5000;

	uint256 public lastId;

	address public plaNFTSeed;


	constructor(address _plaNFTSeed) ERC721("PlaNFT", "PNFT") {
		plaNFTSeed = _plaNFTSeed;
	}


	function _baseURI() internal view virtual override returns (string memory) {
		return "ipfs://QmbEgGYK8ZEMfzQddAoSP6fZjNDZQiRp3kpivNAEyJsYMH/";
	}

	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(_exists(tokenId), "Token id does not exist");
		return string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
	}

	function growPlaNFT() external {
		// Check that collection is not sold out
		require(lastId < MAX_PLANFT, "Collection sold out");

		// Transfer funds
		IERC20(plaNFTSeed).transferFrom(msg.sender, address(this), PLANFT_PRICE);

		// Mint PlaNFT for caller
		_mint(msg.sender, ++lastId);
	}

}
