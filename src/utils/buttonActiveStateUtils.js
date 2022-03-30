import React from "react";
import { useSelector } from "react-redux";
import {
  Compress_PDF,
  JPG_To_PDF,
  Merge_PDF,
  PDF_To_JPG,
  Remove_PDF,
  Split_PDF,
} from "../constants/process.constants";

export const buttonActiveState = (processSelected, fileLength) => {
  const processOptions = useSelector((state) => state.process.processOptions);

  const splitValidationCheck = () => {
    if (fileLength > 0) {
      if (processOptions?.mode == 0) {
        return true;
      } else {
        const extractPageRegex = /\d-\d/g;
        if (extractPageRegex.test(processOptions?.pages)) {
          return true;
        }
      }
    }
  };

  const removeValidationCheck = () => {
    if (fileLength > 0) {
      const extractPageRegex = /\d-\d/g;
      if (extractPageRegex.test(processOptions)) return true;
    }
  };

  switch (processSelected) {
    case Merge_PDF:
      return fileLength > 1 ? true : false;
    case Compress_PDF:
      return fileLength > 0 ? true : false;
    case Split_PDF:
      return splitValidationCheck();
    case Remove_PDF:
      return removeValidationCheck();
    case PDF_To_JPG:
      return fileLength > 0;
    case JPG_To_PDF:
      return fileLength > 0;
    default:
      return true;
  }
};
