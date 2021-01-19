const nodeTemplate = require("../templates/node.json");

module.exports = function (projectType) {
  switch (projectType) {
    case "nodeJs":
      return nodeTemplate;
    default:
      return {};
  }
};
