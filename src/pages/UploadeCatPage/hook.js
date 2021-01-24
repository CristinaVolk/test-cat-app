import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";

export function useComponent() {
  const [selectedPictures, setSelectedPictures] = useState([]);
  const { loading, request, error } = useHttp();
  const history = useHistory();
  const message = useMessage();

  async function onDrop(pictureFiles) {
    setSelectedPictures(pictureFiles[0]);
    const fileData = new FormData();
    fileData.append("file", pictureFiles[0]);

    try {
      const response = await request(
        "post",
        { "Content-Type": "multipart/form-data" },
        fileData,
        "https://api.thecatapi.com/v1/images/upload",
      );

      if (response) {
        message("You have successfully uploaded the image!");
        history.push("/images");
      }
    } catch (e) {
      console.error(error);
      message("Error: ", error);
    }
  }

  return { loading, onDrop };
}
