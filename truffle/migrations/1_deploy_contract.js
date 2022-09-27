const KingOfFools = artifacts.require("KingOfTheFools");

module.exports = function (deployer) {
  deployer.deploy(KingOfFools);
};
