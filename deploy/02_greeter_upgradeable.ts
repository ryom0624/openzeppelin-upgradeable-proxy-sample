import "@openzeppelin/hardhat-upgrades";

/*
  Without hardhat-deploy
*/
// import { ethers, upgrades } from "hardhat";
//
// module.exports = async () => {
//   const V1Addr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // localhost / hardhat Network
//   // const V1Addr = "0x31fb9a1f4d99816e770Ca62805596c4B766CDA55"; // Goerli Network
//   const GreeterV2 = await ethers.getContractFactory("GreeterV2");
//   console.log("Deploying GreeterV2...");
//   await upgrades.upgradeProxy(V1Addr, GreeterV2);
//   console.log("Greeter2 deployed...");
// };
// module.exports.tags = ["Greeter2"];

/*
  With hardhat-deploy
*/
import { ProxyOptions } from "hardhat-deploy/types";

module.exports = async ({ deployments, getNamedAccounts }: any) => {
  const { deploy, catchUnknownSigner } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("GreeterV2", {
    from: deployer,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "setGreeting",
          args: ["HelloV2"],
        }, // バグ??
        onUpgrade: {
          methodName: "setGreeting",
          args: ["HelloV2"],
        },
      },
    } as ProxyOptions,
  });
};
module.exports.tags = ["Greeter2"];
