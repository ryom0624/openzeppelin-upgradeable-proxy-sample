import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Greeter, GreeterV2 } from "../typechain-types";

describe("Greeter", async () => {
  let signer: SignerWithAddress;
  let greeter: Greeter;
  let greeterV2: GreeterV2;

  beforeEach(async () => {
    const { Greeter } = await deployments.fixture(["Greeter"]);

    greeter = (await ethers.getContractAt(
      "Greeter",
      Greeter.address,
      signer
    )) as Greeter;

    signer = (await ethers.getSigners())[0];
  });

  it("default greeting value is 'Hello'", async () => {
    expect(await greeter.connect(signer).greet()).to.be.equal("Hello");
  });

  it("change value to 'Hola'", async () => {
    expect(await greeter.connect(signer).greet()).to.be.equal("Hello");
    await greeter.connect(signer).setGreeting("Hola");
    expect(await greeter.connect(signer).greet()).to.be.equal("Hola");
  });

  it("deploy V2", async () => {
    const { GreeterV2 } = await deployments.fixture(["GreeterV2"]);

    greeterV2 = (await ethers.getContractAt(
      "GreeterV2",
      GreeterV2.address,
      signer
    )) as GreeterV2;

    expect(await greeterV2.connect(signer).greetWithName("World")).to.be.equal(
      "HelloV2 World"
    );
  });
});
