const _ = require("lodash");
const gs = require("ghostscript4js");
const pdfPageCount = require("pdf_page_count");
const { deleteFilesFromTemp } = require("./deleteFilesFromTemp");
// const inputFilePath = ".\\temp\\pdf\\";
// const outputFilePath = "C:\\Users\\PRAMOD~1\\Desktop\\testoutput\\";
const { tempFilePath, outputFilePath } = require("../constants/filepath");

async function removePages(files, options, win) {
  try {
    for (let i = 0; i < files.length; i++) {
      const numPages =
        (await new Promise((resolve) => {
          pdfPageCount.count(tempFilePath + files[i], function (resp) {
            return resolve(resp.data);
          });
        })) + 1;
      //   const pagesToRemove = options; // eg: "2-3"
      const firstPageFromOption = Math.min(options.split("-")[0]);
      const lastPageFromOption = Number(options.split("-")[1]) + 1; //add +1 because lodash end range doesnt include the last value
      const removePagesRange = _.range(firstPageFromOption, lastPageFromOption);
      const totalPagesRange = _.range(1, numPages);
      const filteredPages = totalPagesRange.filter(
        (page) => !removePagesRange.includes(page)
      );
      let inputShellScript = "";
      filteredPages.forEach((page) => {
        inputShellScript += ` -dFirstPage=${page} -dLastPage=${page}  ${tempFilePath}${files[i]}`;
      });
      const fileName = files[i].replace(/[^A-Za-z0-9.]/g, "_");

      await gs.execute(
        `
            gs \
              -o ${outputFilePath}${fileName} \
              -sDEVICE=pdfwrite \
              ${inputShellScript}`
      );
      win.webContents.send("remove:progress", i);
    }

    win.webContents.send("remove:completed", "COMPLETED PROCRESS");
    deleteFilesFromTemp();
  } catch (error) {
    console.log(error);
    win.webContents.send("remove:failed", "something went wrong...");
  }
}

module.exports = { removePages };
