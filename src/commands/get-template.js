const nodeTemplate = require("../templates/node.json");

module.exports = function (projectType) {
  switch (projectType) {
    case "node":
      return nodeTemplate;
    default:
      return {};
  }
};
