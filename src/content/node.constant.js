const packageContent = function (data) {
  return `{
    "name": "${data.projectName}",
    "version": "${data.version}",
    "description": "",
    "main": "src/index.js",
    "scripts": {
      "test": "echo \\\"Error: no test specified\\\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }`;
};

const emptyFunction = function (data) {
  return `console.log("Hello World!");`;
};

module.exports = {
  "node.package.content": packageContent,
  "node.empty-function": emptyFunction,
};
