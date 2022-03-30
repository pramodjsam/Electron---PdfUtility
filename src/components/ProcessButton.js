import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { startProcess } from "../actions/process.actions";
import {
  Compress_PDF,
  Merge_PDF,
  PDF_To_JPG,
  Remove_PDF,
  Split_PDF,
  JPG_To_PDF,
} from "../constants/process.constants";
import { buttonActiveState } from "../utils/buttonActiveStateUtils";

const ProcessButton = ({ files, processSelected }) => {
  const dispatch = useDispatch();
  const compressOptionSelected = useSelector((state) => state.compress);
  const isProcessStarted = useSelector((state) => state.process.started);
  const currentProcess = useSelector((state) => state.process.selected);
  const pdfLoaded = useSelector((state) => state.process.pdfLoaded);
  const processOptions = useSelector((state) => state.process.processOptions);

  // !buttonActiveState(processSelected, files.length) ||
  // isProcessStarted ||
  // !pdfLoaded

  // console.log(!buttonActiveState(processSelected, files.length));
  // console.log(isProcessStarted);
  // console.log(!pdfLoaded);
  // console.log(processSelected);

  const compressProcessHandler = () => {
    const filePath = files.map((file) => file.path);
    dispatch(startProcess());

    switch (currentProcess) {
      case Compress_PDF:
        electron.progressSendApi("compress", {
          filePath,
          options: compressOptionSelected,
          process: currentProcess,
        });
        break;
      case Merge_PDF:
        electron.progressSendApi("merge", {
          filePath,
          process: currentProcess,
          options: null,
        });
        break;
      case Split_PDF:
        electron.progressSendApi("split", {
          filePath,
          process: currentProcess,
          options: processOptions,
        });
        break;
      case Remove_PDF:
        electron.progressSendApi("remove", {
          filePath,
          process: currentProcess,
          options: processOptions,
        });
        break;
      case PDF_To_JPG:
        electron.progressSendApi("pdfToJpg", {
          filePath,
          process: currentProcess,
          options: null,
        });
        break;
      case JPG_To_PDF:
        electron.progressSendApi("JpgToPdf", {
          filePath,
          process: currentProcess,
          options: null,
        });
        break;
    }
  };

  const imageProcessButtonActiveState = (fileLength) => {
    if (fileLength > 0) {
      return true;
    }
    return false;
  };

  return processSelected == JPG_To_PDF ? (
    <button
      onClick={compressProcessHandler}
      disabled={files.length > 0}
      className={files.length > 0 ? "modal__button" : "modal__button--disabled"}
    >
      {processSelected}
      <span className="modal__button--icon">
        <BsArrowRightCircle />
      </span>
    </button>
  ) : (
    <button
      onClick={compressProcessHandler}
      disabled={
        !buttonActiveState(processSelected, files.length) ||
        isProcessStarted ||
        !pdfLoaded
      }
      className={
        buttonActiveState(processSelected, files.length) &&
        !isProcessStarted &&
        pdfLoaded
          ? "modal__button"
          : "modal__button--disabled"
      }
    >
      {processSelected}
      <span className="modal__button--icon">
        <BsArrowRightCircle />
      </span>
    </button>
  );
};

export default ProcessButton;

// return (
//   <button
//     onClick={compressProcessHandler}
//     disabled={
//       processSelected !== JPG_To_PDF
//         ? !buttonActiveState(processSelected, files.length) ||
//           isProcessStarted ||
//           !pdfLoaded
//         : false
//     }
//     className={
//       processSelected !== JPG_To_PDF
//         ? buttonActiveState(processSelected, files.length) &&
//           !isProcessStarted &&
//           pdfLoaded
//           ? "modal__button"
//           : "modal__button--disabled"
//         : buttonActiveState(processSelected, files.length)
//         ? "modal__button"
//         : "modal__button--disabled"
//     }
//   >
//     {processSelected}
//     <span className="modal__button--icon">
//       <BsArrowRightCircle />
//     </span>
//   </button>
// );
