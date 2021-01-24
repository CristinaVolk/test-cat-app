import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useComponent } from "./hook";

export function Vote({ image }) {
  const { votes, voteUp, voteDown } = useComponent(image);
  return (
    <>
      <div className='button' onClick={voteUp}>
        <FontAwesomeIcon className='fa_custom' size='1x' icon={faThumbsUp} />
      </div>
      <div className='button' onClick={voteDown}>
        <FontAwesomeIcon className='fa_custom' size='1x' icon={faThumbsDown} />
      </div>
      <div className='voteFrame'>Votes: {votes}</div>
    </>
  );
}
