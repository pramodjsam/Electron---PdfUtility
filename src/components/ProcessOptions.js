import React from "react";
import {
  Compress_PDF,
  Merge_PDF,
  Remove_PDF,
  Split_PDF,
} from "../constants/process.constants";
import "./ProcessOptions.css";
import CompressOption from "./ProcessOptionSelected/CompressOption";
import RemoveOption from "./ProcessOptionSelected/RemoveOption";
import SplitOption from "./ProcessOptionSelected/SplitOption";

export const ProcessSpecificOptions = ({ processSelected }) => {
  switch (processSelected) {
    case Merge_PDF:
      return null;
    case Split_PDF:
      return <SplitOption />;
    case Compress_PDF:
      return <CompressOption />;
    case Remove_PDF:
      return <RemoveOption />;
    default:
      return null;
  }
};
