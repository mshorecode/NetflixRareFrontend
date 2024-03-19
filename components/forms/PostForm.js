import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createPost, editPost } from '../../api/postApi';
import { getAllCategories } from '../../api/categoryApi';
import getTags from '../../api/tagsAPI';

function PostForm({ post }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
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
      };
      createPost(payload).then(router.push('/feed'));
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
    <Card className="p-2">
      <h1 className="text-center">Make a Post</h1>
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
        <>
          {tags?.map((tag) => (
            <div key={`inline-${tag.id}`} className="mb-3">
              <Form.Check
                inline
                label={tag.label}
                name={tag.id}
                type={tag.id}
                id={`inline-${tag.id}-1`}
              />
            </div>
          ))}
        </>

        <Button type="submit">
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
