import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dropdown, Card } from 'react-bootstrap';
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
    if (post?.id) setFormData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post?.id) {
      editPost(formData).then(() => router.push('/feed'));
    } else {
      const payload = {
        ...formData,
        publication_Date: new Date(),
        tags: selectedTags,
      };
      createPost(payload);
      // .then(router.push('/feed'));
      console.warn(payload);
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
    <Card className="p-2 flex flex-col my-5">
      <h1 className="text-center">Make a Post</h1>
      <Form
        className="flex flex-col"
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Write your post"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="image_Url"
            value={formData.image_Url}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Select
          aria-label="Category"
          name="category_Id"
          onChange={handleChange}
          value={formData.category_Id}
          required
        >
          <option value="">Select a Category</option>
          {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))
          }
        </Form.Select>
        <div
          className="flex flex-row m-4"
        >
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
            >
              Tag your post
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tags.map((option) => (
                <Dropdown.Item
                  key={option.id}
                  onClick={() => toggleTag(option)}
                  active={
                  selectedTags.includes(option.id)
                  }
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div>
            {selectedTags?.map((tag) => (
              <TagBadge id={tag.id} />
            ))}
          </div>
        </div>

        <Button className="place-self-center" type="submit">
          Publish
        </Button>
      </Form>
    </Card>
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
  }).isRequired,
};

export default PostForm;
