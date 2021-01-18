#! /usr/bin/env node
(async () => {
  const createDiectory = require("./commands/create-directory");
  const getTemplate = require("./commands/get-template");
  const mergeLayers = require("./commands/merge-layer");
  const materializer = require("./commands/materializer");
  const path = require("path");

  const args = process.argv.slice(2);
  const action = args[0];
  const projectName = args[1];
  const projectTypes = args.splice(2);

  switch (action) {
    case "help":
      console.log(
        "Usage: archetyper <option> <project-name> <project-type...>"
      );
      break;
    case "create":
      let srcDirectory = process.cwd();
      createDiectory(projectName, srcDirectory);
      console.log("the template types are ", projectTypes);
      const templates = projectTypes.map((projectType) =>
        getTemplate(projectType)
      );
      await materializer(
        mergeLayers(templates),
        srcDirectory + "/" + projectName,
        {
          projectName,
          version: "1.0.0",
        }
      );

      break;
    default:
      console.log("no such options found");
      break;
  }
})();
