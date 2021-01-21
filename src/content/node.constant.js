const npmSearch = require("libnpmsearch");
const prettier = require("prettier");

const packageContent = async function (data) {
  const dependency = await buildDependency(data.dependencies);
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

const emptyFunction = async function (data) {
  return `console.log("Hello World!");`;
};

async function buildDependency(dependencies) {
  const dependency = {};
  for (const dep of dependencies) {
    const npmPackage = (
      await npmSearch(dep, {
        limit: 1,
      })
    )[0];
    dependency[npmPackage.name] = npmPackage.version;
  }

  return JSON.stringify(dependency);
}

async function dotEnvConfig(data) {
  return prettier.format(
    `
  const config = require("dotenv").config;
  config();`,
    { parser: "babel" }
  );
}
module.exports = {
  "node.package.content": packageContent,
  "node.empty-function": emptyFunction,
  "node.dotenv-require.configure": dotEnvConfig,
};
