import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteTag, getTags } from '../api/tagsAPI';
import TagForm from '../components/forms/TagForm';

function Tagmanager() {
  const [tags, setTags] = useState([]);

  const getAllTheTags = () => {
    getTags().then(setTags);
  };

  useEffect(() => {
    getAllTheTags();
  }, [tags]);

  const handleDelete = (e) => {
    deleteTag(e.target.id).then(setTags);
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
            {tags.map((tag) => (
              <tr>
                <td> {tag.label}</td>
                <td> <Button className="bg-red-500 hover:bg-red-500 text-black-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow" id={tag.id} onClick={handleDelete}> Delete </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex">
        <TagForm />
      </div>
    </div>
  );
}

export default Tagmanager;
