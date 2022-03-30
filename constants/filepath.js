const { app } = require("electron");
const user = app.getPath("temp").split("\\")[2];

const tempFilePath = app.getPath("temp") + "\\pdftoolkit\\pdf\\";
const outputFilePath =
  `C:\\Users\\${user}\\Downloads` + `\\pdftoolkit\\output\\`;

module.exports = {
  tempFilePath,
  outputFilePath,
};
