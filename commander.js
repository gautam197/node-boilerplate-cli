#!/usr/bin/env node
const program = require("commander");

const {
  createBoilerPlate,
  createFile,
  createFileWithName,
  createExpress,
} = require("./index");
const { createSystem } = require("./systemMaker");

program.version("1.0.0").description("command line tool for nodejs");
const { prompt } = require("inquirer");
const { route } = require("express/lib/application");

const initQuestion = [
  {
    type: "input",
    name: "entry_file",
    description: "Your base project file (Default is index.js)",
  },
  {
    type: "input",
    name: "packages",
    description: "Your packages in a program (please seperate with space)",
  },
];

program
  .command("new")
  .alias("a")
  .description("create a new node js project")
  .action(() => {
    prompt(initQuestion).then((answers) => {
      createBoilerPlate(answers);
    });
  });

program
  .command("start")
  .alias("s")
  .description("creates server.js file")
  .action(() => createFile());

program
  .command("start <name>")
  .alias("s")
  .description("creates file with specific name.")
  .action((name) => createFileWithName(name));

program
  .command("express")
  .alias("ex")
  .description("creates creates express project")
  .action(() => createExpress());

program
  .option("-R, --makeroute <vlaue>", "Create user defined routes.")
  .option("-C, --makecontroller <vlaue>", "Create user defined controller.")
  .option("-M --makemodel<value>", "Creates user defined controller")
  .action((value) => {
    createSystem(value);
  });

program.parse(process.argv);
