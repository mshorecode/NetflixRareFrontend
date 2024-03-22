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
  }, []);

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
                <td> <Button color="bg-red" id={tag.id} onClick={handleDelete}> Delete </Button> <Button color="bg-red"> Edit </Button></td>
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
