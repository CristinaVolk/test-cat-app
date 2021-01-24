import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

export function useComponent(image) {
  const [votes, setVotes] = useState(0);
  const { request, clearError } = useHttp();
  const message = useMessage();

  const getVotes = async () => {
    try {
      const data = await request(
        "get",
        null,
        null,
        "https://api.thecatapi.com/v1/votes",
      );

      if (data.length) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const voteUp = async () => {
    try {
      let post_data = {
        image_id: image.id,
        sub_id: "v413",
        value: 1,
      };

      const currentVotes = await getVotes();
      const checkedArray = checkForDuplicates(post_data, currentVotes);
      if (checkedArray && checkedArray.length === 1) {
        message("Sorry, you cannot vote/unvote more than once for one cat");
        return;
      } else {
        try {
          let responseData = await request(
            "post",
            { "Content-Type": "application/json" },
            post_data,
            "https://api.thecatapi.com/v1/votes",
          );
          if (responseData.message === "SUCCESS") {
            const numberOfVotes = calculateVotes(await getVotes());
            setVotes(numberOfVotes);
            return numberOfVotes;
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const voteDown = async () => {
    try {
      let post_data = {
        image_id: image.id,
        sub_id: "v413",
        value: 0,
      };
      const currentVotes = await getVotes();
      const checkedArray = checkForDuplicates(post_data, currentVotes);
      if (checkedArray && checkedArray.length === 1) {
        message("Sorry, you cannot vote/unvote more than once for one cat");
        return;
      }
      let responseData = await request(
        "post",
        { "Content-Type": "application/json" },
        post_data,
        "https://api.thecatapi.com/v1/votes",
      );
      if (responseData.message === "SUCCESS") {
        const numberOfVotes = calculateVotes(await getVotes());
        setVotes(numberOfVotes);
        return numberOfVotes;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkForDuplicates = (post_data, data) => {
    const filteredData = data.filter(
      (item) =>
        post_data.image_id === item.image_id &&
        post_data.sub_id === item.sub_id &&
        post_data.value === item.value,
    );
    return filteredData;
  };

  const calculateVotes = (data) => {
    const filteredImgs = data.filter((item) => item.image_id === image.id);
    const filterVotes = filteredImgs.map((item) => item.value);

    return filterVotes.reduce((total, num) => {
      return total + num;
    }, 0);
  };

  const fetchVotes = async () => {
    const currentVotes = await getVotes();
    setVotes(calculateVotes(currentVotes));
  };

  useEffect(() => {
    fetchVotes();

    return () => {
      clearError();
    };
  }, []);

  return { votes, voteUp, voteDown };
}
