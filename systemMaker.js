const shell = require("shelljs");
const fs = require("fs");
const { letsAppendFile } = require("./middleware/index");
const checkDir = require("./middleware/readDir");

const createBoilerPlate = (value) => {
  shell.exec("npm init -y");
  let rawdata = fs.readFileSync("package.json");
  let dataJson = JSON.parse(rawdata);

  try {
    if (value.entry_file === "") {
      shell.exec("touch index.js");
      console.log("index.js created successfully!!!");
      dataJson.main = "index.js";

      shell.exec(`npm i ${value.packages}`);
      letsAppendFile("index.js");
    } else {
      shell.exec(`touch ${value.entry_file}`);
      console.log(`${value.entry_file} created successfully!!!`);
      dataJson.main = value.entry_file;
      shell.exec(`npm i ${value.packages}`);

      letsAppendFile(value.entry_file);
    }
  } catch (error) {
    console.log(error);
  }

  console.log("enjoy nodejs ... :)");
  process.exit(1);
};

const createFile = () => {
  try {
    shell.exec(`touch server.js`);
    console.log("server.js created successfully!!!");
  } catch (error) {
    throw new Error("Unable to create serve.js");
  }
};

const createFileWithName = (name) => {
  try {
    shell.exec(`touch ${name}`);
    console.log(`${name} created successfully!!!`);
  } catch (error) {
    throw new Error("Unable to create ${name}");
  }
};
const createExpress = () => {
  try {
    shell.exec(`npm init -y`);
    shell.exec(`npm i express`);
    console.log("Express project created successfully!!!");
    letsAppendFile("server.js");
  } catch (error) {
    throw new Error("Unable to create express project");
  }

  console.log("enjoy nodejs  with express... :)");
  process.exit(1);
};

const createSystem = (value) => {
  try {
    if (!value) {
      console.log("Unable to find names!!");
      process.exit(1);
    }
    if (value.makeroute) {
      const pathDetail = shell.exec("pwd");
      const path = pathDetail.stdout.replace("\n", "");
      const hasDir = checkDir(path);
      if (hasDir !== undefined) {
        try {
          fs.writeFileSync(
            `routes/${value.makeroute}.js`,
            "//@hazesoft/nodejs"
          );
          console.log(`${value.makeroute} creating ....`);
        } catch (error) {
          throw new Error("Unable to make your file.");
        }
      } else {
        try {
          shell.exec("mkdir routes");
          fs.writeFileSync(
            `routes/${value.makeroute}.js`,
            "//@hazesoft/nodejs"
          );
        } catch (error) {
          throw new Error("Unable to make your file.");
        }
      }
      try {
        const fileData = fs.readFileSync(
          `${__dirname}/stubs/routeStubs.txt`,
          "utf8"
        );
        const result = fileData.replace(/{{routeName}}/g, value.makeroute);
        try {
          fs.appendFileSync(
            `routes/${value.makeroute}.js`,
            "\n" + result,
            "utf8"
          );
          console.log(`${value.makeroute} Successfully created`);
        } catch (error) {
          console.log("Unable to write in file 1");
        }
      } catch (error) {
        console.log("Unable to write in file");
      }

      process.exit(1);
    }
  } catch (error) {}
};

module.exports = {
  createBoilerPlate,
  createFile,
  createFileWithName,
  createExpress,
  createSystem,
};
