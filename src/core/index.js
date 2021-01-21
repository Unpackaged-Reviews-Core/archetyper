const getTemplate = require("../commands/get-template");
const mergeLayers = require("../commands/merge-layer");

module.exports = {
  getTreeStructure: function (projectTypes) {
    let layers = projectTypes.map((type) => getTemplate(type));
    let config = mergeLayers(layers);
    return config;
  },
  getAvailableTemplates: function () {
    return ["nodeJs", ".env"];
  },
};
