import "@openzeppelin/hardhat-upgrades";

/*
  Without hardhat-deploy
*/
// import { ethers, upgrades } from "hardhat";
//
// module.exports = async () => {
//   const Greeter = await ethers.getContractFactory("Greeter");
//   console.log("Deploying Greeter...");
//   const greeter = await upgrades.deployProxy(Greeter, ["Hello"], {
//     initializer: "setGreeting",
//   });
//   await greeter.deployed();
//   console.log("Greeter deployed to:", greeter.address);
//   console.log(await greeter.greet());
// };
// module.exports.tags = ["Greeter"];

/*
  With hardhat-deploy
*/

import { ProxyOptions } from "hardhat-deploy/types";

module.exports = async ({ deployments, getNamedAccounts }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Greeter", {
    from: deployer,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "setGreeting",
          args: ["hello"],
        },
      },
    } as ProxyOptions,
  });
};
module.exports.tags = ["Greeter"];
