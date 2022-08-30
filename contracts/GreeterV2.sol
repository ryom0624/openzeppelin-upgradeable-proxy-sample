//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract GreeterV2 {
    string private greeting;
    string private hoge;


    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function greetWithName(string memory _name) public view returns (string memory) {
        return string(abi.encodePacked(greeting, " ", _name));
    }
}
