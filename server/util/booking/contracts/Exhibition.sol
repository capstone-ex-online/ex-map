// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/Pausable.sol";

contract Exhibition is Ownable{
	address _owner = owner();
	uint256 _ticketPrice = 0;
	mapping(address => bool) public user;

	event RefundedToOwner(address indexed _dest, uint256 _refundedBalance);
	event bookingCompleted(address indexed _depositor, uint256 _depositedValue);

	constructor(address _creator, uint256 _price) payable{
		_owner = _creator;
		_ticketPrice = _price;
	}

	function booking() external payable {
		require(msg.value == _ticketPrice, "price is different");
		// require(!user[msg.sender]);

		user[msg.sender] = true;
        emit bookingCompleted(msg.sender, msg.value);
    }

	//전시회 정산
	function refundToOwner() external onlyOwner{
		require(address(this).balance > 0, "exhibition balance is 0");
		uint256 refundedBalance = address(this).balance;
		payable(_owner).transfer(refundedBalance);
		emit RefundedToOwner(msg.sender, refundedBalance);
	}

}