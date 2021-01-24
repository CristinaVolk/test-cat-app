import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useComponent } from "./hook";

export const Favourite = ({ image }) => {
  const { saved, favourite, unFavourite } = useComponent(image);
  return (
    <>
      {saved === false ? (
        <div className='button' onClick={favourite}>
          <FontAwesomeIcon className='fa_custom' icon={farHeart} size='1x' />
        </div>
      ) : (
        <div className='button' onClick={unFavourite}>
          <FontAwesomeIcon className='fa_custom' icon={faHeart} size='1x' />
        </div>
      )}
    </>
  );
};
