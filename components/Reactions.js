/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import getReactions from '../api/reactionAPI';

function Reactions() {
  const [allReactions, setAllReactions] = useState([]);

  const getAllTheReactions = () => {
    getReactions().then(setAllReactions);
  };

  useEffect(() => {
    getAllTheReactions();
  }, []);

  console.warn(allReactions);

  return (
    <div className="flex">
      {allReactions.map((reaction) => (
        <div x-data="{ isOpen: false }">
          <button
            className="text-gray-800 hover:bg-gray-200 font-bold p-2 rounded transition-colors duration-300"
          >
            <img src={reaction.image_Url} height="32px" width="32px" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Reactions;
