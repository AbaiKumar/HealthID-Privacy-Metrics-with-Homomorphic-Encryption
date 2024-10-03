// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract HealthID {
    struct HealthData {
        string name; // Encrypted name
        string healthID; // Encrypted HealthID
        string phrNumber; // Encrypted PHR Number
        string dob; // Encrypted Date of Birth
        string gender; // Encrypted Gender
        string mobile; // Encrypted Mobile Number
        bool isEncrypted; // Flag to indicate if data is encrypted
    }

    mapping(address => HealthData) private healthRecords;

    // Add health data (encrypted) to the blockchain
    function addHealthData(
        string memory _name,
        string memory _healthID,
        string memory _phrNumber,
        string memory _dob,
        string memory _gender,
        string memory _mobile
    ) public {
        healthRecords[msg.sender] = HealthData(
            _name,
            _healthID,
            _phrNumber,
            _dob,
            _gender,
            _mobile,
            true
        );
    }

    // Retrieve health data (encrypted) from the blockchain
    function getHealthData() public view returns (HealthData memory) {
        return healthRecords[msg.sender];
    }
}
