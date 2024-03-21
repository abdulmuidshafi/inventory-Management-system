import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CloudUploadIcon } from "@heroicons/react/outline";
function UploadImage({ uploadImage }) {
  const [fileName, setFileName] = useState("");
  const handleFileInputChange = (event) => {
    setFileName(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };
  return (
    <Form.Group controlId="fileInput">
      <Form.Label className="d-flex align-items-center">
        <CloudUploadIcon className="w-6 h-6 mr-2" aria-hidden="true" />
        <span className="inline-block">
          {fileName?.name ? fileName.name : "Choose file"}
        </span>
      </Form.Label>
      <Form.Control
        type="file"
        accept=".png, .jpeg, .jpg"
        required
        onChange={handleFileInputChange}
      />
    </Form.Group>
  );
}
export default UploadImage;