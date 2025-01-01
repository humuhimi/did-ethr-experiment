// SPDX-License-Identifier: MIT
// NOTE: example
pragma solidity ^0.8.28;

contract DIDRegistry {
    mapping(address => string) public dids;

    event DIDRegistered(address indexed owner, string did);

    function registerDID(string memory did) public {
        dids[msg.sender] = did;
        emit DIDRegistered(msg.sender, did);
    }

    function getDID(address owner) public view returns (string memory) {
        return dids[owner];
    }
}