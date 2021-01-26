#! /usr/bin/env node
(async () => {
  const createDiectory = require("./commands/create-directory");
  const getTemplate = require("./commands/get-template");
  const mergeLayers = require("./commands/merge-layer");
  const materializer = require("./commands/materializer");

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
      const templates = projectTypes.map((projectType) =>
        getTemplate(projectType)
      );
      if (templates[0].layer !== 1) {
        console.log("Please select a language/framework such as nodeJs");
      } else {
        let srcDirectory = process.cwd();
        createDiectory(projectName, srcDirectory);
        await materializer(
          mergeLayers(templates),
          srcDirectory + "/" + projectName,
          {
            projectName,
            version: "1.0.0",
            dependencies: projectTypes.slice(1),
          }
        );
        console.log("The templates built are:", projectTypes);
      }
      break;
    default:
      console.log("Selected templates are unavailable");
      break;
  }
})();
