const contentGenerators = require("../content/index");
const writeDirectory = require("./create-directory");
const path = require("path");
const fs = require("fs");

module.exports = async function (template, projectPath, data) {
  const structure = template.structure;
  structure.file.forEach(async (element) => {
    await createFile(projectPath, element, data);
  });
  structure.directory.map(
    async (element) => await createDirectory(projectPath, element, data)
  );
};

async function createFile(folderPath, file, data) {
  let filePath = path.join(folderPath, file.name);
  let stream = fs.createWriteStream(filePath, { flags: "a" });
  for (const elem of file.content) {
    let code;
    if (elem === "empty") {
      code = "";
    } else {
      code = await contentGenerators[elem](data);
    }
    stream.write(code + "\n");
  }
  stream.close();
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
