import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Modal,
  ProgressBar,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DropFileInput from "./DropFileInput";
import "./ProcessModal.css";
import { AiOutlineClose } from "react-icons/ai";
import PreviewViewer from "./PreviewViewer";
import ProcessButton from "./ProcessButton";
import { ProcessSpecificOptions } from "./ProcessOptions";
import { endProcess, clearProcess } from "../actions/process.actions";
import { JPG_To_PDF } from "../constants/process.constants";

const ProcessModal = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [processFailed, setProcessFailed] = useState(null);
  const processSelected = useSelector((state) => state.process.selected);
  const isProcessStarted = useSelector((state) => state.process.started);
  const pdfLoaded = useSelector((state) => state.process.pdfLoaded);

  useEffect(() => {
    console.log("Process useEffect from ProcessModal");
    const validChannels = [
      "compress:progress",
      "compress:completed",
      "compress:failed",
      "merge:progress",
      "merge:completed",
      "merge:failed",
      "split:progress",
      "split:completed",
      "split:failed",
      "remove:progress",
      "remove:completed",
      "remove:failed",
      "pdfToJpg:progress",
      "pdfToJpg:completed",
      "pdfToJpg:failed",
      "JpgToPdf:progress",
      "JpgToPdf:completed",
      "JpgToPdf:failed",
    ];
    const progressListener = (data) => {
      setProcessFailed(false);
      setProgress(data);
    };

    const completedListener = () => {
      dispatch(endProcess());
      setProgress(0);
    };

    const failedListener = (data) => {
      setProcessFailed(data);
      dispatch(endProcess());
    };

    validChannels.forEach((channel) => {
      channel.split(":")[1].includes("progress")
        ? electron.ProcessReceiveApi(channel, progressListener)
        : channel.split(":")[1].includes("completed")
        ? electron.ProcessReceiveApi(channel, completedListener)
        : electron.ProcessReceiveApi(channel, failedListener);
    });

    return () => {
      validChannels.forEach((channel) => {
        channel.split(":")[1].includes("progress")
          ? electron.removeEventApi(channel, progressListener)
          : channel.split(":")[1].includes("completed")
          ? electron.removeEventApi(channel, completedListener)
          : electron.removeEventApi(channel, failedListener);
      });
    };
  }, []);

  useEffect(() => {
    console.log("ProcessModal - openModal useEffect");
    setShow(openModal);
  }, [openModal]);

  const closeHandler = () => {
    setOpenModal(false);
    setFiles([]);
    dispatch(clearProcess());
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {isProcessStarted ? "Please wait for the process to complete" : "close"}
    </Tooltip>
  );

  return (
    <>
      <Modal
        show={openModal}
        onHide={() => (!isProcessStarted ? closeHandler(false) : undefined)}
        dialogClassName="modal-80w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body className="modal__body">
          <Container fluid className="modal__container">
            <Row className="modal__row">
              <Col xs={12} md={8} className="modal__left">
                {files.length > 0 ? (
                  <PreviewViewer
                    uploadedFiles={files}
                    setUploadedFiles={setFiles}
                    processSelected={processSelected}
                  />
                ) : (
                  <DropFileInput
                    isModal
                    className="modal__file"
                    setFiles={setFiles}
                  />
                )}
              </Col>
              <Col xs={6} md={4} className="modal__right text-center">
                <div>
                  <div className="modal__header">
                    <OverlayTrigger
                      placement={isProcessStarted ? "bottom" : "right"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <div
                        className="modal__close--button"
                        onClick={!isProcessStarted ? closeHandler : undefined}
                      >
                        <AiOutlineClose size="1.5rem" />
                      </div>
                    </OverlayTrigger>
                    <h3 className="modal__header--title">{processSelected}</h3>
                  </div>
                  {<ProcessSpecificOptions processSelected={processSelected} />}
                </div>

                <div className="modal__right--bottom">
                  {processFailed && (
                    <div className="modal__process--failed">
                      {/* Something went wrong... */}
                      {processFailed}
                    </div>
                  )}
                  {!pdfLoaded &&
                    processSelected !== JPG_To_PDF &&
                    files.length > 0 && (
                      <div className="modal__process--loading">
                        Loading PDF...
                      </div>
                    )}

                  <div
                    className={`progress__bar--box ${
                      isProcessStarted && "progress__bar--box-visible"
                    } `}
                  >
                    <ProgressBar
                      animated
                      label={`${progress + 1}/${files.length}`}
                      variant="danger"
                      now={((progress + 1) / files.length) * 100}
                      className="progress__bar"
                    />
                  </div>

                  <div className="process__button--box">
                    <ProcessButton
                      files={files}
                      processSelected={processSelected}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProcessModal;
