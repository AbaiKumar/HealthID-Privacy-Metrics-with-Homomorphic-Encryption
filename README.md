
# HealthID Privacy Metrics with Homomorphic Encryption

This repository contains a Python implementation for assessing privacy metrics in a blockchain-based health identity system. The project focuses on quantifying user privacy levels and data leakage using a structured approach. It also explores the application of homomorphic encryption to enhance data privacy while maintaining functionality.

# Features
- Privacy Metrics Calculation: Implements metrics to evaluate user privacy, including User Privacy Score (UPS) and Data Leakage Index (DLI).
- Homomorphic Encryption Impact Assessment: Measures the effectiveness of homomorphic encryption in preserving data privacy.
- Data Encryption and Decryption: Utilizes the cryptography library for secure handling of sensitive health information.

# Technologies Used
- Python (Flask, Pycryptodome)
- Solidity (v0.8.2)
- Ganache (v2.7.1)
- Web Technologies (HTML, CSS, Javascript - ether.js, Hardhat)
- Chrom Extension (MetaMask)


## Installation

Install hardhat with npm

```bash
    npx install hardhat
    npm install --save-dev @nomiclabs/hardhat-ethers ethers
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network ganache
```
    
Install Python Libraries with pip

```bash
    pip install Flask
    pip install pycryptodome
```
    
## Screenshots

![Frontend Screen and MetaMask](https://github.com/AbaiKumar/HealthID-Privacy-Metrics-with-Homomorphic-Encryption/blob/main/screenshots/Screenshot%202024-10-03%20224213.png)
![Blockchain Ganache](https://github.com/AbaiKumar/HealthID-Privacy-Metrics-with-Homomorphic-Encryption/blob/main/screenshots/Screenshot%202024-10-03%20223953.png)

