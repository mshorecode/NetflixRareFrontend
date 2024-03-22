import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getAllCategories } from '../api/categoryApi';
import CategoryForm from '../components/forms/CategoryForm';

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
                <td> <Button color="bg-red"> Delete </Button> <Button color="bg-red"> Edit </Button></td>
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
