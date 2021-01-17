const fs = require("fs");

module.exports = function (projectName, srcDirectory) {
  /* add validations and error when the directory already exists */
  if (!fs.existsSync(srcDirectory + "/" + projectName)) {
    fs.mkdirSync(srcDirectory + "/" + projectName);
  }
};
