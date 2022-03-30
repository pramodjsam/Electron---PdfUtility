const gs = require("ghostscript4js");
const { deleteFilesFromTemp } = require("./deleteFilesFromTemp");
// const inputFilePath = ".\\temp\\pdf\\";
// const outputFilePath = "C:\\Users\\PRAMOD~1\\Desktop\\testoutput\\";
const { tempFilePath, outputFilePath } = require("../constants/filepath");

async function mergeFiles(files, win) {
  try {
    let fullPaths = "";
    for (let i = 0; i < files.length; i++) {
      const fileName = tempFilePath + files[i];
      fullPaths += i == files.length - 1 ? `${fileName}` : `${fileName} `;

      win.webContents.send("merge:progress", i);
    }

    await gs.execute(
      `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/default -sOutputFile=${outputFilePath}merged.pdf ${fullPaths}`
    );

    win.webContents.send("merge:completed", "COMPLETED PROCRESS");

    deleteFilesFromTemp();
  } catch (error) {
    console.log(error);
    win.webContents.send("merge:failed", "something went wrong...");
  }
}

module.exports = mergeFiles;
