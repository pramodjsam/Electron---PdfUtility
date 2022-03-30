import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { AiOutlinePlus } from "react-icons/ai";
import "./PreviewViewer.css";
import { truncateFileName } from "../utils/fileNameUtils";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { pdfLoaded } from "../actions/process.actions";
import { JPG_To_PDF } from "../constants/process.constants";

const PreviewViewer = ({
  uploadedFiles,
  setUploadedFiles,
  processSelected,
}) => {
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState(null);
  const previewRef = useRef(null);
  let initialPagesRedered = 0;

  function overrideEventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const onDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    previewRef.current.classList.add("preview__dragover");
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    previewRef.current.classList.remove("preview__dragover");
  };

  function handleDragAndDropFiles(event) {
    overrideEventDefaults(event);
    previewRef.current.classList.remove("preview__dragover");
    if (!event.dataTransfer) return;
    handleFiles(event.dataTransfer.files);
  }
  const handleFiles = (fileList) => {
    if (fileList) {
      let filesArray = Array.from(fileList);
      const filteredFiles = filesArray.filter((file) => {
        return file.type.split("/")[1] === "pdf";
      });
      setUploadedFiles([...uploadedFiles, ...filteredFiles]);
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.display = "none";
    });
  }

  function renderPageSuccess() {
    initialPagesRedered++;
    if (initialPagesRedered == uploadedFiles.length) {
      dispatch(pdfLoaded(true));
    }
  }

  const onFileDrop = (e) => {
    const newFiles = Object.values(e.target.files);
    newFiles.forEach((file) => {
      if (file.type.split("/")[1] === "pdf") {
        if (newFiles) {
          const updatedList = [...uploadedFiles, ...newFiles];
          setUploadedFiles(updatedList);
        }
      } else {
        console.log("Only pdf are allowed");
      }
    });
  };

  const removeHandler = (index) => {
    const updatedFiles = uploadedFiles.filter(
      (_, fileIndex) => fileIndex !== index
    );
    setUploadedFiles(updatedFiles);
  };

  const filePreview = (file) => {
    switch (processSelected) {
      case JPG_To_PDF:
        return (
          <img
            src={URL.createObjectURL(file)}
            style={{ height: 200, width: 125 }}
          />
        );
      default:
        return (
          <Document file={file.path} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              size="A4"
              height={200}
              width={125}
              scale={1}
              onLoadSuccess={removeTextLayerOffset}
              onRenderSuccess={renderPageSuccess}
              pageNumber={1}
            />
          </Document>
        );
    }
  };

  return (
    <div
      className="preview"
      ref={previewRef}
      onDrop={handleDragAndDropFiles}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={overrideEventDefaults}
    >
      <div className="preview__addicon">
        <AiOutlinePlus />
        <input type="file" value="" onChange={onFileDrop} multiple />
      </div>
      <Container className="preview__container">
        <Row>
          {uploadedFiles.length > 0 &&
            uploadedFiles.map((file, index) => (
              <Col sm={4} key={index}>
                <div className="preview__document">
                  <div
                    className="preview__document--close"
                    onClick={() => removeHandler(index)}
                  >
                    <BiPlus size="2rem" />
                  </div>
                  {filePreview(file)}
                  <div className="preview__title">
                    {truncateFileName(file.name)}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default PreviewViewer;
