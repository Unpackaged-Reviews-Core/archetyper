const fs = require("fs");

module.exports = function (projectName, srcDirectory) {
  /* add validations and error when the directory already exists and standardize*/
  if (!fs.existsSync(srcDirectory + "/" + projectName)) {
    fs.mkdirSync(srcDirectory + "/" + projectName);
  }
};
