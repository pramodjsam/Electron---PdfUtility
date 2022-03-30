const fs = require("fs");
const { app } = require("electron");
const path = require("path");
const { copyFile } = require("fs/promises");
const { compressFiles } = require("./compressFiles");
const { JpgToPdf } = require("./JpgToPdf");
const mergeFiles = require("./mergeFiles");
const { pdfToJpg } = require("./pdfToJpg");
const { removePages } = require("./removePages");
const { splitFiles } = require("./splitFiles");
const { tempFilePath } = require("../constants/filepath");
// const tempFilePath = app.getPath("temp") + "\\pdftoolkit\\pdf\\";

async function moveFilestoTemp({ filePath, options, process }, win) {
  if (!fs.existsSync(tempFilePath)) {
    fs.mkdir(tempFilePath, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  }

  await Promise.all(
    filePath.map((file) => {
      const fileName = file
        .split("\\")
        .pop()
        .replace(/[^A-Za-z0-9.]/g, "_");
      return copyFile(
        file,
        tempFilePath + fileName,
        fs.constants.COPYFILE_FICLONE
      );
    })
  );

  // for (let i = 0; i < filePath.length; i++) {
  //   const fileName = filePath[i]
  //     .split("\\")
  //     .pop()
  //     .replace(/[^A-Za-z0-9.]/g, "_");
  //   await copyFile(
  //     filePath[i],
  //     tempFilePath + fileName,
  //     fs.constants.COPYFILE_FICLONE
  //   );
  // }

  // for (let i = 0; i < filePath.length; i++) {
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(win.webContents.send("compress:progress", i));
  //     }, 1000);
  //   });
  // }
  // win.webContents.send("compress:completed", "COMPLETED PROCRESS");

  fs.readdir(tempFilePath, (err, files) => {
    if (err) console.log(err);

    switch (process) {
      case "Compress PDF":
        compressFiles(files, options, win);
        break;
      case "Merge PDF":
        mergeFiles(files, win);
        break;
      case "Split PDF":
        splitFiles(files, options, win);
        break;
      case "Remove PDF":
        removePages(files, options, win);
        break;
      case "PDF to JPG":
        pdfToJpg(files, win);
        break;
      case "JPG to PDF":
        JpgToPdf(files, win);
        break;
    }
  });
}

module.exports = { moveFilestoTemp };
