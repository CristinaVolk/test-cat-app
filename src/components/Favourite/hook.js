import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

export function useComponent(image) {
  const { request } = useHttp();
  const [saved, setSaved] = useState(false);
  const [savedImgId, setSavedImgId] = useState("");
  const message = useMessage();

  const favourite = async () => {
    try {
      let post_data = {
        image_id: image.id,
        sub_id: "yqqq",
      };

      let response = await request(
        "post",
        {
          "content-type": "application/json",
        },
        post_data,
        "https://api.thecatapi.com/v1/favourites",
      );

      if (response && response.message === "SUCCESS") {
        let localSaved = saved;
        setSaved(!localSaved);
        setSavedImgId(response.id);
        message("Saved as favourite");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const unFavourite = async () => {
    try {
      let response = await request(
        "delete",
        null,
        null,
        `https://api.thecatapi.com/v1/favourites/${savedImgId}`,
      );
      if (response.message === "SUCCESS") {
        message("Unsaved as favourite");
        let localSaved = saved;
        setSaved(!localSaved);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { saved, favourite, unFavourite };
}
