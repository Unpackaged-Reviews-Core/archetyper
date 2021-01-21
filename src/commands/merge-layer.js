const merge = require("lodash").assign;
const isArray = require("lodash").isArray;
const isString = require("lodash").isString;

module.exports = function (templates) {
  let finalLayer = {
    structure: {
      directory: [],
      file: [],
    },
  };

  templates.forEach((layer) => {
    let tmp = {
      structure: mergeDirectory(finalLayer.structure, layer.structure),
    };
    tmp.structure.file = finalLayer.structure.file;

    tmp.structure.file = mergeFile(
      finalLayer.structure.file,
      layer.structure.file
    );
    finalLayer = tmp;
  });
  return finalLayer;
};

function mergeDirectory(directory1, directory2) {
  let directoryMap = new Map();
  directory1.directory.forEach((elem) => {
    if (directoryMap.has(elem.name)) {
      directoryMap.get(elem.name).push(elem);
    } else {
      directoryMap.set(elem.name, [elem]);
    }
  });
  directory2.directory.forEach((elem) => {
    if (directoryMap.has(elem.name)) {
      directoryMap.get(elem.name).push(elem);
    } else {
      directoryMap.set(elem.name, [elem]);
    }
  });
  let finalDirectory = [];
  directoryMap.forEach((value, key) => {
    if (value.length === 1) {
      finalDirectory.push(value[0]);
    } else {
      let merged = mergeDirectory(value[0], value[1]);
      if (merged.length !== 0) {
        merged.name = key;
        merged.file = mergeFile(value[0].file, value[1].file);
        finalDirectory.push(merged);
      }
    }
  });

  return {
    directory: finalDirectory,
  };
}
function mergeFile(file1, file2) {
  let fileNames = new Map();
  file1.forEach((elem) => {
    if (fileNames.has(elem.name)) {
      fileNames.get(elem.name).push(elem);
    } else {
      fileNames.set(elem.name, [elem]);
    }
  });
  file2.forEach((elem) => {
    if (fileNames.has(elem.name)) {
      fileNames.get(elem.name).push(elem);
    } else {
      fileNames.set(elem.name, [elem]);
    }
  });
  let finalFile = [];
  fileNames.forEach((value, key) => {
    if (value.length === 1) {
      finalFile.push(value[0]);
    } else {
      finalFile.push({
        name: key,
        content: [...value[0].content, ...value[1].content],
      });
    }
  });
  return finalFile;
}
