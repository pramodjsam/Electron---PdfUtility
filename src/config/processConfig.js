import { AiFillFileExcel, AiFillFilePdf, AiFillFileWord } from "react-icons/ai";
import { BiRotateRight } from "react-icons/bi";
import { FaCompressArrowsAlt, FaFilePowerpoint } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdImage } from "react-icons/md";
import { RiMergeCellsVertical, RiSplitCellsVertical } from "react-icons/ri";
import {
  Compress_PDF,
  Excel_To_PDF,
  JPG_To_PDF,
  Merge_PDF,
  PDF_To_Excel,
  PDF_To_JPG,
  PDF_To_PowerPoint,
  PDF_To_Word,
  PowerPoint_To_PDF,
  Remove_PDF,
  Rotate_PDF,
  Split_PDF,
  Word_To_PDF,
} from "../constants/process.constants";

export const processList = [
  {
    name: Merge_PDF,
    color: "#ee7659",
    icon: RiMergeCellsVertical,
  },
  {
    name: Split_PDF,
    color: "#ee7659",
    icon: RiSplitCellsVertical,
  },
  {
    name: Compress_PDF,
    color: "#8fbc5d",
    icon: FaCompressArrowsAlt,
  },
  {
    name: Remove_PDF,
    color: "#ee6c4d",
    icon: IoMdRemoveCircle,
  },
  {
    name: JPG_To_PDF,
    color: "#ffd400",
    icon: MdImage,
  },
  {
    name: PDF_To_JPG,
    color: "#ffd400",
    icon: AiFillFilePdf,
  },
  // {
  //   name: PDF_To_Word,
  //   color: "#6487c8",
  //   icon: AiFillFileWord,
  // },
  // {
  //   name: PDF_To_Excel,
  //   color: "#5ea162",
  //   icon: AiFillFileExcel,
  // },
  // {
  //   name: PDF_To_PowerPoint,
  //   color: "#ff7651",
  //   icon: FaFilePowerpoint,
  // },
  // {
  //   name: Word_To_PDF,
  //   color: "#6487c8",
  //   icon: AiFillFileWord,
  // },
  // {
  //   name: Excel_To_PDF,
  //   color: "#5ea162",
  //   icon: AiFillFileExcel,
  // },
  // {
  //   name: PowerPoint_To_PDF,
  //   color: "#ff7651",
  //   icon: FaFilePowerpoint,
  // },
  // {
  //   name: Rotate_PDF,
  //   color: "#ab6993",
  //   icon: BiRotateRight,
  // },
];
