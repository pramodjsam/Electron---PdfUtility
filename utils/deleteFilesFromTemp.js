const fs = require("fs");
const { app } = require("electron");
const path = require("path");
// const inputFilePath = ".\\temp\\pdf\\";
// const inputFilePath = app.getPath("temp") + "\\pdftoolkit\\";
// const inputFilePath = path.join(__dirname, "..\\temp\\pdf\\");
const { tempFilePath } = require("../constants/filepath");

function deleteFilesFromTemp() {
  fs.rmSync(tempFilePath, { recursive: true, force: true });
  // fs.readdir(inputFilePath, (err, files) => {
  //   if (err) console.log(err);

  //   for (const file of files) {
  //     fs.unlink(inputFilePath + file, (err) => {
  //       if (err) console.log(err);
  //     });
  //   }
  // });
}

module.exports = { deleteFilesFromTemp };
