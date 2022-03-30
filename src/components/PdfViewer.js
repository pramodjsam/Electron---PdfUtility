import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { truncateFileName } from "../utils/fileNameUtils";
import "./PdfViewer.css";
import { scaleSizes } from "../config/scaleConfig";

const PdfViewer = ({ files, setFiles }) => {
  const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [selectedScale, setSelectedScale] = useState(150);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState(0);
  const tabDocumentRef = useRef(null);
  const tabIndividualRef = useRef(null);

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

  const selectionHandler = (e) => {
    setSelectedScale(e.target.textContent);
    setIsActive(false);
  };

  const scrollHandler = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const singlePageHeight = (scrollHeight / numPages) * 0.8;
    const presentPage =
      Math.floor(scrollTop / singlePageHeight) + 1 < numPages
        ? Math.floor(scrollTop / singlePageHeight) + 1
        : numPages;
    setCurrentPage(presentPage);
  };

  const scrollFromTop = () => {
    const element = ReactDOM.findDOMNode(tabDocumentRef.current);
    const scrollHeight = element.scrollHeight;
    const singlePageHeight = scrollHeight / numPages;
    element.scrollTop = singlePageHeight * currentPage;
  };

  const scrollFromBottom = () => {
    const element = ReactDOM.findDOMNode(tabDocumentRef.current);
    const scrollHeight = element.scrollHeight;

    const singlePageHeight = scrollHeight / numPages;
    element.scrollTop = (currentPage - 1) * singlePageHeight - singlePageHeight;
  };

  const pageUpHandler = () => {
    if (currentPage >= numPages) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
      scrollFromTop();
    }
  };

  const pageDownHandler = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
      scrollFromBottom();
    }
  };

  const onChangeHandler = (e) => {
    setCurrentPage(e.target.value);
  };

  const scaleUpHandler = () => {
    const presetScale = scaleSizes.indexOf(selectedScale) + 1;
    setSelectedScale(scaleSizes[presetScale]);
  };

  const scaleDownHandler = () => {
    const presetScale = scaleSizes.indexOf(selectedScale) - 1;
    setSelectedScale(scaleSizes[presetScale]);
  };

  const tabCloseHandler = () => {
    const updatedDocument = files.filter((_, index) => index !== selectedDoc);
    setFiles(updatedDocument);
  };

  const docSelectionHandler = (e, index) => {
    if (!e.target.classList.contains("tab__close")) {
      setSelectedDoc(index);
    }
  };

  const onMouseWheel = (e) => {
    var delta = Math.max(-1, Math.min(1, e.deltaY));
    tabIndividualRef.current.scrollLeft += delta * 40;
  };

  return (
    <div className="viewer">
      <div className="viewer__toolbar"></div>
      {/* Document Tab */}
      <div className="tab">
        <div className="tab__fixed">
          <div
            className="tab__individual"
            ref={tabIndividualRef}
            onWheel={onMouseWheel}
          >
            {/*Tab */}
            {files.map((doc, index) => (
              <div
                key={index}
                className={
                  selectedDoc == index
                    ? `tab__single--active tab__single`
                    : "tab__single"
                }
                onClick={(e) => docSelectionHandler(e, index)}
              >
                <div className="tab__single--title">
                  {truncateFileName(doc.name)}
                </div>
                <span className="tab__close" onClick={tabCloseHandler}>
                  x
                </span>
              </div>
            ))}

            {/* End ofTab */}
          </div>
          <div className="tab__toolbar">
            <div className="tab__pageSelector">
              <button
                className="pageup__button"
                disabled={currentPage === numPages}
                onClick={pageUpHandler}
              >
                <IoIosArrowUp />
              </button>
              <button
                className="pagedown__button"
                disabled={currentPage == 1}
                onClick={pageDownHandler}
              >
                <IoIosArrowDown />
              </button>
              <input
                className="tab__page--input"
                type="text"
                value={currentPage}
                onChange={onChangeHandler}
                disabled
              />{" "}
              / {numPages}
            </div>
            <div className="tab__scale">
              <button
                className="scaledown__button"
                disabled={selectedScale == 25}
                onClick={scaleDownHandler}
              >
                -
              </button>
              <button
                className="scaleup__button"
                disabled={selectedScale == 200}
                onClick={scaleUpHandler}
              >
                +
              </button>
              <div className="dropdown">
                <div
                  className="dropdown__btn"
                  onClick={() => setIsActive(!isActive)}
                >
                  <div>{selectedScale}%</div>
                  <div>
                    <AiFillCaretDown />
                  </div>
                </div>
                {isActive && (
                  <div className="dropdown__content">
                    {scaleSizes.map((item, index) => (
                      <div
                        key={index}
                        onClick={selectionHandler}
                        className="dropdown__item"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab__document"
          ref={tabDocumentRef}
          onScroll={scrollHandler}
        >
          <Document
            file={files[selectedDoc].path.toString()}
            // file="F:\\Desktop\\Study plan-canada.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div style={{ marginBottom: "1rem" }} key={`page-${index + 1}`}>
                <Page
                  size="A4"
                  scale={selectedScale / 100}
                  onLoadSuccess={removeTextLayerOffset}
                  pageNumber={index + 1}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
      {/* End of Document Tab */}
    </div>
  );
};

export default PdfViewer;
