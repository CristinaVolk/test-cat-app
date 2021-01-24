import React from "react";
import { Favourite } from "./Favourite";
import { Vote } from "./Vote";

export const Cat = ({ catImage }) => {
  return (
    <div key={catImage.id} className='fadein'>
      <img src={catImage.url} alt='' />
      <div className='fa-icons'>
        <Favourite image={catImage} />
        <Vote image={catImage} />
      </div>
    </div>
  );
};
