import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createPost, editPost } from '../../api/postApi';
import { getAllCategories } from '../../api/categoryApi';
import { getTags } from '../../api/tagsAPI';
import TagBadge from '../TagBadge';

function PostForm({ post }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    publication_Date: null,
    category_Id: 0,
    title: '',
    content: '',
    image_Url: '',
    approved: false,
    user_Id: user.id,
    tags: [],
  });

  const toggleTag = (option) => {
    if (selectedTags.includes(option)) {
      setSelectedTags(
        selectedTags.filter((item) => item !== option),
      );
    } else {
      setSelectedTags(
        [...selectedTags, option],
      );
    }
  };

  useEffect(() => {
    getAllCategories().then(setCategories);
    getTags().then(setTags);
    if (post?.id) {
      setFormData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post?.id) {
      const payload = {
        ...formData,
        tags: selectedTags,
      };
      editPost(payload).then(() => router.push('/feed'));
    } else {
      const payload = {
        ...formData,
        publication_Date: new Date(),
        tags: selectedTags,
      };
      createPost(payload).then(() => (router.push('/feed')));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Card className="p-2 flex flex-col my-5 mx-auto w-[40%] bg-inherit border-none">
        <h1 className="font-semibold mb-4 fs-5">Write a Post</h1>
        <Form
          className="flex flex-col"
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <Form.Label className="sm:text-sm sm:leading-6 mb-0">Title</Form.Label>
            <Form.Control
              type="text"
              className="input rounded-none mb-3 sm:text-sm sm:leading-6"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="sm:text-sm sm:leading-6 mb-0">Content</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              className="input rounded-none sm:text-sm sm:leading-6 mb-3"
              placeholder="Write your post"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="sm:text-sm sm:leading-6 mb-0">Image</Form.Label>
            <Form.Control
              type="url"
              className="input rounded-none mb-3 sm:text-sm sm:leading-6"
              placeholder="Enter image URL"
              name="image_Url"
              value={formData.image_Url}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Select
            aria-label="Category"
            className="rounded-none w-50 mt-0 sm:text-sm sm:leading-6 mb-2 bg-inherit border-slate-500 py-0 focus-within:outline-none focus-within:ring-1 focus-within:ring-slate-500 focus-within:border-slate-500"
            name="category_Id"
            onChange={handleChange}
            value={formData.category_Id}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))}
          </Form.Select>
          <div
            className="flex flex-row justify-start"
          >
            {tags.map((t) => (
              <>
                <div className="flex flex-row items-center my-2">
                  <Form.Check
                    className="mr-1 border-slate-500 d-inline-block"
                    key={t.id}
                    onClick={() => toggleTag(t)}
                  />
                  <TagBadge id={t.id} />
                </div>
              </>
            ))}
          </div>
        </Form>
        <Button className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-1 w-24 py-1" type="submit">
          Publish
        </Button>
      </Card>
    </>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user_Id: PropTypes.number,
    category_Id: PropTypes.number,
    publication_Date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    content: PropTypes.string,
    image_Url: PropTypes.string,
    approved: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }).isRequired,
};

export default PostForm;
