const gs = require("ghostscript4js");
const fs = require("fs");
const { deleteFilesFromTemp } = require("./deleteFilesFromTemp");
const pdfPageCount = require("pdf_page_count");
// const inputFilePath = ".\\temp\\pdf\\";
// const outputFilePath = "C:\\Users\\PRAMOD~1\\Desktop\\testoutput\\";
const { tempFilePath, outputFilePath } = require("../constants/filepath");

async function splitFiles(files, options, win) {
  try {
    for (let i = 0; i < files.length; i++) {
      const numPages = await new Promise((resolve) => {
        pdfPageCount.count(tempFilePath + files[i], function (resp) {
          return resolve(resp.data);
        });
      });

      if (options.mode == 0) {
        for (let j = 0; j < numPages; j++) {
          const fileName = files[i]
            .split("\\")
            .pop()
            .replace(/[^A-Za-z0-9.]/g, "_")
            .split(".")[0]
            .concat(`_splitted_00${j + 1}`, ".pdf");

          await gs.execute(
            `gs -dNOPAUSE -dQUIET -q -dBATCH -sOutputFile="${outputFilePath}${fileName}" -dFirstPage=${
              j + 1
            } -dLastPage=${j + 1} -sDEVICE=pdfwrite ${tempFilePath}${files[i]}`
          );

          // win.webContents.send("split:subprogress", j);
        }
      } else if (options.mode == 1) {
        const startPage = Math.min(options.pages.split("-")[0], numPages);
        const finishPage = Math.min(options.pages.split("-")[1], numPages);
        const totalSelectedPages = finishPage - startPage + 1;

        for (let k = 0; k < totalSelectedPages; k++) {
          let f = startPage + k;
          const fileName = files[i]
            .split("\\")
            .pop()
            .replace(/[^A-Za-z0-9.]/g, "_")
            .split(".")[0]
            .concat(`_splitted_00${f}`, ".pdf");

          try {
            gs.executeSync(
              `gs -dNOPAUSE -dQUIET -q -dBATCH -sOutputFile="${outputFilePath}${fileName}" -dFirstPage=${f} -dLastPage=${f} -sDEVICE=pdfwrite ${tempFilePath}${files[i]}`
            );

            // win.webContents.send("split:subprogress", k);
          } catch (err) {
            console.log(err);
            win.webContents.send("split:failed", "something went wrong...");
          }
        }
      }

      win.webContents.send("split:progress", i);
    }

    win.webContents.send("split:completed", "COMPLETED PROCRESS");

    deleteFilesFromTemp();
  } catch (error) {
    console.log(error);
    win.webContents.send("split:failed", "something went wrong...");
  }
}

module.exports = { splitFiles };
