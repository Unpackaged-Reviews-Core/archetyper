const npmSearch = require("libnpmsearch");
const prettier = require("prettier");

const packageContent = async function (data) {
  const dependency = await buildDependency();
  return prettier.format(
    `{
    "name": "${data.projectName}",
    "version": "${data.version}",
    "description": "",
    "main": "src/index.js",
    "scripts": {
      "test": "echo \\\"Error: no test specified\\\" && exit 1"
    },
    "dependency":${dependency},
    "author": "",
    "license": "ISC"
  }`,
    { parser: "json" }
  );
};

const emptyFunction = function (data) {
  return `console.log("Hello World!");`;
};

async function buildDependency(params) {
  const dotenv = (
    await npmSearch("dotenv", {
      limit: 1,
    })
  )[0];

  return JSON.stringify({ [dotenv.name]: dotenv.version }, null, 2);
}

module.exports = {
  "node.package.content": packageContent,
  "node.empty-function": emptyFunction,
};
