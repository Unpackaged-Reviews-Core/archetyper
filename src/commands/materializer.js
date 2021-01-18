const contentGenerators = require("../content/index");
const writeDirectory = require("./create-directory");
const path = require("path");
const fs = require("fs");

module.exports = async function (template, projectPath, data) {
  const structure = template.structure;
  structure.file.forEach(async (element) => {
    await createFile(projectPath, element, data);
  });
  structure.directory.forEach(
    async (element) => await createDirectory(projectPath, element, data)
  );
};

async function createFile(folderPath, file, data) {
  fs.writeFileSync(
    path.join(folderPath, file.name),
    await contentGenerators[file.content](data),
    function (err) {
      console.error(err);
    }
  );
}

async function createDirectory(folderPath, folder, data) {
  writeDirectory(folder.name, folderPath);
  let directoryName = path.join(folderPath, folder.name);
  folder.file.forEach(async (element) => {
    await createFile(directoryName, element, data);
  });
  folder.directory.forEach(
    async (element) => await createDirectory(directoryName, element, data)
  );
}
