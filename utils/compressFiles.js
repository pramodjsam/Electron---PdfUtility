const gs = require("ghostscript4js");
// const { app } = require("electron");
// const path = require("path");
const fs = require("fs");
const { deleteFilesFromTemp } = require("./deleteFilesFromTemp");
const { tempFilePath, outputFilePath } = require("../constants/filepath");
// const inputFilePath = app.getPath("temp") + "\\pdftoolkit\\pdf\\";
// const user = app.getPath("temp").split("\\")[2];
// const outputFilePath =
//   `C:\\Users\\${user}\\Downloads` + `\\pdftoolkit\\output\\`;

async function compressFiles(files, quality, win) {
  const gsQuality = setQuality(quality);

  if (!fs.existsSync(outputFilePath)) {
    fs.mkdir(outputFilePath, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  }
  try {
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i]
        .split("\\")
        .pop()
        .replace(/[^A-Za-z0-9.]/g, "_");
      const fileNameWithQuality = fileName
        .split(".")[0]
        .concat("_", quality.split("_")[0].toLowerCase(), ".pdf");
      await gs.execute(
        `-q -dNOPAUSE -dBATCH -dNOSAFER -sDEVICE=pdfwrite -dPDFSETTINGS=/${gsQuality} \
        -dEmbedAllFonts=true -dSubsetFonts=true -dAutoRotatePages=/None \
         -sOutputFile=${outputFilePath}${fileNameWithQuality} ${tempFilePath}${files[i]}`
      );
      win.webContents.send("compress:progress", i);
    }

    win.webContents.send("compress:completed", "COMPLETED PROCRESS");

    deleteFilesFromTemp();
  } catch (error) {
    console.log(error);
    win.webContents.send(
      "compress:failed",
      "something went wrong by compress..."
    );
  }
}

function setQuality(quality) {
  switch (quality) {
    case "LOW_QUALITY":
      return "ebook";
    case "MEDIUM_QUALITY":
      return "printer";
    case "HIGH_QUALITY":
      return "prepress";
    default:
      return "printer";
  }
}

module.exports = { compressFiles };

// Other options for PDFSETTINGS:

// /screen selects low-resolution output similar to the Acrobat Distiller "Screen Optimized" setting.
// /ebook selects medium-resolution output similar to the Acrobat Distiller "eBook" setting.
// /printer selects output similar to the Acrobat Distiller "Print Optimized" setting.
// /prepress selects output similar to Acrobat Distiller "Prepress Optimized" setting.
// /default selects output intended to be useful across a wide variety of uses, possibly at the expense of a larger output file.
