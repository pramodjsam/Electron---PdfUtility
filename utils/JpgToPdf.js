const fs = require("fs");
const imgToPDF = require("image-to-pdf");
const { deleteFilesFromTemp } = require("./deleteFilesFromTemp");
// const inputFilePath = ".\\temp\\pdf\\";
// const outputFilePath = "C:\\Users\\PRAMOD~1\\Desktop\\testoutput\\";
const { tempFilePath, outputFilePath } = require("../constants/filepath");

async function JpgToPdf(files, win) {
  try {
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i]
        .replace(/[^A-Za-z0-9.]/g, "_")
        .split(".")[0]
        .concat(".pdf");
      imgToPDF([tempFilePath + files[i]], "A4").pipe(
        fs.createWriteStream(`${outputFilePath}${fileName}`)
      );
      win.webContents.send("JpgToPdf:progress", i);
    }

    win.webContents.send("JpgToPdf:completed", "COMPLETED PROCRESS");

    deleteFilesFromTemp();
  } catch (error) {
    console.log(error);
    win.webContents.send("JpgToPdf:failed", "something went wrong...");
  }
}

module.exports = { JpgToPdf };
