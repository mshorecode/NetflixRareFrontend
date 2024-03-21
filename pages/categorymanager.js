import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';

function Categorymanager() {
  const [categories, setCategories] = useState([]);

  const getAllTheCategories = () => {
    getAllCategories().then(setCategories);
  };

  useEffect(() => {
    getAllTheCategories();
  }, []);

  console.warn(categories);

  return (
    <div>categorymanager</div>
  );
}

export default Categorymanager;
