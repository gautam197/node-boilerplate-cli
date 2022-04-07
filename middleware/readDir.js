const fs = require("fs");
const shell = require("shelljs");

const checkDir = (path) => {
  filenames = fs.readdirSync(path);

  return filenames.find((element) => element === "routes");
};

module.exports = checkDir;
