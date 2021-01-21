const nodeTemplate = require("../templates/node.json");
const dotEnvNodeTemplate = require("../templates/dotenv.json");

module.exports = function (projectType) {
  switch (projectType) {
    case "nodeJs":
      return nodeTemplate;
    case "dotenv":
      return dotEnvNodeTemplate;
    default:
      return {};
  }
};
