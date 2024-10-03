async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const HealthID = await ethers.getContractFactory("HealthID");
    const healthID = await HealthID.deploy();

    console.log("Charity contract deployed to:", healthID.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
