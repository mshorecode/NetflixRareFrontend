/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { GoTrash } from 'react-icons/go';
import { getAllCategories, deleteCategory } from '../api/categoryApi';
import CategoryForm from '../components/forms/CategoryForm';

function Categorymanager() {
  const [categories, setCategories] = useState([]);

  const getAllTheCategories = () => {
    getAllCategories().then(setCategories);
  };

  useEffect(() => {
    getAllTheCategories();
  }, [categories]);

  const handleDelete = (e) => {
    deleteCategory(e.target.id).then(setCategories);
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="display: flex;">
        <Table className="table-auto">
          <thead>
            <tr>
              <th className="background">Tags</th>
              <th className="background">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr>
                <td className="background"> {cat.label}</td>
                <td className="background">
                  <Button className="background hover:bg-transparent text-black-100 font-semibold border-none rounded-sm pl-5" onClick={handleDelete}>
                    <GoTrash id={cat.id} className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex mx-auto">
        <CategoryForm />
      </div>
    </div>
  );
}

export default Categorymanager;
