import React, { useRef, useState } from "react";
import "./DropFileInput.css";
// import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../assets/cloud-upload-regular-240.png";
import { JPG_To_PDF, Remove_PDF } from "../constants/process.constants";
import { useSelector } from "react-redux";

const DropFileInput = ({ isModal = false, setFiles }) => {
  const [fileList, setFileList] = useState([]);
  const processSelected = useSelector((state) => state.process.selected);
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const checkFileType = (file) => {
    switch (processSelected) {
      case JPG_To_PDF:
        return file.type.split("/")[0] === "image";
      default:
        return file.type.split("/")[1] === "pdf";
    }
  };

  const onFileDrop = (e) => {
    const newFiles = Object.values(e.target.files);
    newFiles.forEach((file) => {
      if (checkFileType(file)) {
        if (newFiles) {
          const updatedList = [...fileList, ...newFiles];
          setFileList(updatedList);
          setFiles(updatedList);
        }
      } else {
        console.log("Only pdf are allowed");
      }
    });
  };

  // const fileRemove = (file) => {
  //   const updatedList = [...fileList];
  //   updatedList.splice(fileList.indexOf(file), 1);
  //   setFileList(updatedList);
  // };

  const singleFilesOption = () => {
    switch (processSelected) {
      case Remove_PDF:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <div
        className="drop_file_input"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop_file_input__label">
          <img src={uploadImg} alt="uploading" />
          <p>Drag & Drop your files here</p>
        </div>
        {singleFilesOption() ? (
          <input type="file" value="" onChange={onFileDrop} />
        ) : (
          <input type="file" value="" onChange={onFileDrop} multiple />
        )}
      </div>
    </>
  );
};

// DropFileInput.propTypes = {
//   onFileChange: PropTypes.func,
// };

export default DropFileInput;
