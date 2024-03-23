import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
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
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr>
                <td> {cat.label}</td>
                <td> <Button className="bg-red-500 hover:bg-red-500 text-black-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow" id={cat.id} onClick={handleDelete}> Delete </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex">
        <CategoryForm />
      </div>
    </div>
  );
}

export default Categorymanager;
