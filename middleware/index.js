const fs = require("fs");

const letsAppendFile = (fileName) => {
  const data = `const express = require('express');
const app = express();

//import routes

const port = 3000;

//add routes 
//app.use()

app.listen(port, () => {
  console.log("App is listening!!")
});`;

  try {
    fs.appendFileSync(fileName, data, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`${fileName} written successfully`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  letsAppendFile,
};
