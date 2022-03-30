import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import DropFileInput from "./components/DropFileInput";
import PdfViewer from "./components/PdfViewer";
import Sidebar from "./components/Sidebar";

function App() {
  // const [files, setFiles] = useState([
  // {
  //   name: "Mastering Xamarin UI.pdf",
  //   path: "F:\\Projects\\Electron\\Project-4 PdfTool\\src\\assets\\sample.pdf",
  //   size: 24150,
  // },
  // {
  //   name: "Mastering Xamarin UI.pdf",
  //   path: "F:\\Projects\\Electron\\Project-4 PdfTool\\src\\assets\\test.pdf",
  //   size: 24150,
  // },
  // {
  //   name: "Study plan-canada.pdf",
  //   path: "F:\\Desktop\\Mastering_Xamarin_UI_Development_(2017).pdf",
  //   size: 24150,
  // },
  // ]);

  const [files, setFiles] = useState([]);

  return (
    <>
      <Container fluid className="mainContainer">
        <Row>
          <Col md={9} style={{ padding: 0 }}>
            {files.length > 0 ? (
              <PdfViewer files={files} setFiles={setFiles} />
            ) : (
              <div className="drag-wrapper">
                <DropFileInput setFiles={setFiles} />
              </div>
            )}
          </Col>
          <Col md={3} style={{ padding: 0 }}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
