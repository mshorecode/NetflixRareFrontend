import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createPost } from '../../api/postApi';
import { getAllCategories } from '../../api/categoryApi';

function PostForm() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const [formData, setFormData] = useState({
    publication_Date: null,
    category_Id: 0,
    title: '',
    content: '',
    image_Url: '',
    approved: false,
    user_Id: user.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      publication_Date: new Date(),
    };
    createPost(payload).then(router.push('/feed'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button type="submit">
        Publish
      </Button>
    </Form>
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
