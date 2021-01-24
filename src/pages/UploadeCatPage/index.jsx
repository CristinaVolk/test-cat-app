import React from "react";
import ImageUploader from "react-images-upload";
import { useComponent } from "./hook";
import { Loader } from "../../components/Loader";

export const UploadCatPage = () => {
  const { loading, onDrop } = useComponent();

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ marginRight: "15px" }}>
      <ImageUploader
        withIcon={true}
        withPreview={true}
        label=''
        buttonText='Upload an Image'
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg", ".jpeg"]}
        maxFileSize={1048576}
        fileSizeError=' file size is too big'
      ></ImageUploader>
    </div>
  );
};
