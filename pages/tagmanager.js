import React, { useState, useEffect } from 'react';
import { getTags } from '../api/tagsAPI';

function Tagmanager() {
  const [tags, setTags] = useState([]);

  const getAllTheTags = () => {
    getTags().then(setTags);
  };

  useEffect(() => {
    getAllTheTags();
    console.warn(tags);
  }, []);

  return (
    <div>tagmanager</div>
  );
}

export default Tagmanager;
