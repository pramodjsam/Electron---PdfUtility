const path = require("path");
const pdf = require("pdf-poppler");
const { deleteFilesFromTemp } = require("./deleteFilesFromTemp");
// const inputFilePath = ".\\temp\\pdf\\";
// const outputFilePath = "C:\\Users\\PRAMOD~1\\Desktop\\testoutput\\";
const { tempFilePath, outputFilePath } = require("../constants/filepath");

async function pdfToJpg(files, win) {
  try {
    for (let i = 0; i < files.length; i++) {
      let opts = {
        format: "jpeg",
        out_dir: outputFilePath,
        out_prefix: path.basename(files[i], path.extname(files[i])),
        page: null,
      };

      await pdf.convert(tempFilePath + files[i], opts);

      win.webContents.send("pdfToJpg:progress", i);
    }
    win.webContents.send("pdfToJpg:completed", "COMPLETED PROCRESS");
    deleteFilesFromTemp();
  } catch (error) {
    console.log(error);
    win.webContents.send("pdfToJpg:failed", "something went wrong...");
  }
}

module.exports = { pdfToJpg };
