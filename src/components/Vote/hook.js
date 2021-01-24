import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

export function useComponent(image) {
  const [votes, setVotes] = useState(0);
  const { request, clearError } = useHttp();
  const message = useMessage();

  const voteUp = async () => {
    try {
      let post_data = {
        image_id: image.id,
        sub_id: "413",
        value: 1,
      };
      let responseData = await request(
        "post",
        { "Content-Type": "application/json" },
        post_data,
        "https://api.thecatapi.com/v1/votes",
      );
      getVotes(post_data);
    } catch (error) {
      console.error(error);
    }
  };

  const voteDown = async () => {
    try {
      let post_data = {
        image_id: image.id,
        sub_id: "413",
        value: 0,
      };
      let responseData = await request(
        "post",
        { "Content-Type": "application/json" },
        post_data,
        "https://api.thecatapi.com/v1/votes",
      );
      console.log("data", responseData);
      getVotes(post_data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkForDuplicates = (post_data, data) => {
    if (!post_data) {
      return null;
    } else {
      const filteredData = data.filter(
        (item) =>
          post_data.image_id === item.image_id &&
          post_data.sub_id === item.sub_id &&
          post_data.value === item.value,
      );
      console.log(data, filteredData);
      return filteredData;
    }
  };

  const calculateVotes = (data) => {
    const filteredImgs = data.filter((item) => item.image_id === image.id);
    const filterVotes = filteredImgs.map((item) => item.value);

    return filterVotes.reduce((total, num) => {
      return total + num;
    }, 0);
  };

  const getVotes = async (post_data) => {
    try {
      const data = await request(
        "get",
        null,
        null,
        "https://api.thecatapi.com/v1/votes",
      );

      if (data.length) {
        const checkedArray = checkForDuplicates(post_data, data);

        if (checkedArray && checkedArray.length > 1) {
          message("Sorry, you cannot vote/unvote more than once for one cat");
          return;
        }

        const numberOfVotes = calculateVotes(data);
        setVotes(numberOfVotes);
        return numberOfVotes;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVotes(null);
    return () => {
      clearError();
    };
  }, []);

  return { votes, voteUp, voteDown };
}
