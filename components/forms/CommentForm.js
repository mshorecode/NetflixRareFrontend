import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createComment } from '../../api/commentApi';

export default function CommentForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    created_On: null,
    post_Id: id,
    content: '',
    author_Id: user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    const payload = {
      ...formData,
      created_On: new Date(),
    };
    createComment(payload).then(router.push(`/post/comments/${id}`));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          placeholder="Write your comment"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button className="place-self-center rounded-none" type="submit">
        Post
      </Button>
    </Form>
  );
}
