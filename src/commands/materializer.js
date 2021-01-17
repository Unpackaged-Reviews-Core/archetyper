const contentGenerators = require("../content/index");
const writeDirectory = require("./create-directory");
const path = require("path");
const fs = require("fs");

module.exports = function (template, projectPath, data) {
  const structure = template.structure;
  structure.file.forEach((element) => {
    createFile(projectPath, element, data);
  });
  structure.directory.forEach((element) =>
    createDirectory(projectPath, element, data)
  );
};

function createFile(folderPath, file, data) {
  fs.writeFileSync(
    path.join(folderPath, file.name),
    contentGenerators[file.content](data),
    function (err) {
      console.error(err);
    }
  );
}

function createDirectory(folderPath, folder, data) {
  writeDirectory(folder.name, folderPath);
  let directoryName = path.join(folderPath, folder.name);
  folder.file.forEach((element) => {
    createFile(directoryName, element, data);
  });
  folder.directory.forEach((element) =>
    createDirectory(directoryName, element, data)
  );
}
