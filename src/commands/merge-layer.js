module.exports = function (templates) {
  let finalLayer = {
    structure: {
      directory: [],
      file: [],
    },
  };

  templates.forEach((layer) => {
    let temporaryLayer = {
      structure: mergeDirectory(finalLayer.structure, layer.structure),
    };
    temporaryLayer.structure.file = finalLayer.structure.file;

    temporaryLayer.structure.file = mergeFile(
      finalLayer.structure.file,
      layer.structure.file
    );
    finalLayer = temporaryLayer;
  });
  return finalLayer;
};

function mergeDirectory(directoryOne, directoryTwo) {
  let directoryMap = new Map();
  directoryOne.directory.forEach((elem) => {
    if (directoryMap.has(elem.name)) {
      directoryMap.get(elem.name).push(elem);
    } else {
      directoryMap.set(elem.name, [elem]);
    }
  });
  directoryTwo.directory.forEach((elem) => {
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
function mergeFile(fileOne, fileTwo) {
  let fileNames = new Map();
  fileOne.forEach((elem) => {
    if (fileNames.has(elem.name)) {
      fileNames.get(elem.name).push(elem);
    } else {
      fileNames.set(elem.name, [elem]);
    }
  });
  fileTwo.forEach((elem) => {
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
