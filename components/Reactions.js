/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getReactions } from '../api/reactionAPI';

function Reactions({ postId, postReactions }) {
  const [allReactions, setAllReactions] = useState([]);
  const [reactionChange, setReactionChange] = useState([]);

  const getAllTheReactions = () => {
    getReactions().then(setAllReactions);
  };

  useEffect(() => {
    getAllTheReactions();
  }, [postReactions]);

  const handleReactionChange = (e) => {
    const changeReactionNow = [postId, e.target.id];
    setReactionChange(changeReactionNow);
    // const payload = reactionChange;
    console.warn(reactionChange);
    // addReaction(payload[0], payload[1]).then(console.warn);
  };

  return (
    <>
      <div className="flex justify-content-end">
        {postReactions.map((reaction) => (
          <button
            className="text-gray-800 hover:bg-gray-200 font-bold p-2 rounded transition-colors duration-300"
            id={reaction.id}
            onClick={handleReactionChange}
          >
            <img src={reaction.image_Url} height="16px" width="16px" />
          </button>
        ))}
      </div>
      <div className="flex">
        {allReactions.map((reaction) => (
          <div x-data="{ isOpen: false }">
            <button
              className="text-gray-800 hover:bg-gray-200 font-bold p-2 rounded transition-colors duration-300"
              id={reaction.id}
              onClick={handleReactionChange}
            >
              <img src={reaction.image_Url} height="16px" width="16px" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

Reactions.propTypes = {
  postId: PropTypes.number.isRequired,
  postReactions: PropTypes.arrayOf(),
};

Reactions.defaultProps = {
  postReactions: [],
};

export default Reactions;
