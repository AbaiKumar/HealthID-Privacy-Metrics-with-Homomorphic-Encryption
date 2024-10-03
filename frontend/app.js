async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("MetaMask connected");
            myAdddress = accounts[0];
            console.log("Connected address:", myAdddress);
        } catch (error) {
            console.error("User denied account access:", error);
        }
    } else {
        alert("MetaMask not found. Please install MetaMask and try again.");
    }
}

connectMetaMask();


async function addHealthData() {
    const name = document.getElementById('name').value;
    const healthID = document.getElementById('healthID').value;
    const phrNumber = document.getElementById('phrNumber').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const mobile = document.getElementById('mobile').value;

    // Encrypt data using the Flask API
    const encryptData = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/encrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            const result = await response.json();
            console.log(result);
            return result.encrypted_data;
        } catch (error) {
            console.error('Encryption failed', error);
        }
    };

    const encryptedName = await encryptData(name);
    const encryptedHealthID = await encryptData(healthID);
    const encryptedPhrNumber = await encryptData(phrNumber);
    const encryptedDob = await encryptData(dob);
    const encryptedGender = await encryptData(gender);
    const encryptedMobile = await encryptData(mobile);

    // Connect to Ethereum using Ethers.js
    if (window.ethereum) {
        try {
            // Web3 provider and contract setup
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            console.log("Connected account:", accounts[0]);

            // Define your contract address and ABI
            const contractAddress = '0xE9F9B78b1d2e2956b31Ec86b62aC6277E6D848e2'; // Replace with your deployed contract address
            const contractABI = [
                {
                    "inputs": [
                        { "internalType": "string", "name": "_name", "type": "string" },
                        { "internalType": "string", "name": "_healthID", "type": "string" },
                        { "internalType": "string", "name": "_phrNumber", "type": "string" },
                        { "internalType": "string", "name": "_dob", "type": "string" },
                        { "internalType": "string", "name": "_gender", "type": "string" },
                        { "internalType": "string", "name": "_mobile", "type": "string" }
                    ],
                    "name": "addHealthData",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getHealthData",
                    "outputs": [
                        {
                            "components": [
                                { "internalType": "string", "name": "name", "type": "string" },
                                { "internalType": "string", "name": "healthID", "type": "string" },
                                { "internalType": "string", "name": "phrNumber", "type": "string" },
                                { "internalType": "string", "name": "dob", "type": "string" },
                                { "internalType": "string", "name": "gender", "type": "string" },
                                { "internalType": "string", "name": "mobile", "type": "string" },
                                { "internalType": "bool", "name": "isEncrypted", "type": "bool" }
                            ],
                            "internalType": "struct HealthID.HealthData",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Send transaction to add data
            const tx = await contract.addHealthData(
                encryptedName,
                encryptedHealthID,
                encryptedPhrNumber,
                encryptedDob,
                encryptedGender,
                encryptedMobile
            );
            console.log("Transaction Hash:", tx.hash);

            // Wait for the transaction to be mined
            await tx.wait();

            alert('Encrypted health data added to blockchain!');
        } catch (error) {
            console.error('Error connecting to blockchain', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}
