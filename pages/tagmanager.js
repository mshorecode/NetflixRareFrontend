/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { GoTrash } from 'react-icons/go';
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
    console.warn('Deleted tag with id:', e.target.id);
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4 w-full">
      <div className="display: flex;">
        <Table className="table-auto">
          <thead>
            <tr>
              <th className="background">Tags</th>
              <th className="background">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr>
                <td className="background">
                  {tag.label}
                </td>
                <td className="background">
                  <Button className="background hover:bg-transparent text-black-100 font-semibold border-none rounded-sm pl-5" onClick={handleDelete}>
                    <GoTrash id={tag.id} className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex mx-auto">
        <TagForm />
      </div>
    </div>
  );
}

export default Tagmanager;
