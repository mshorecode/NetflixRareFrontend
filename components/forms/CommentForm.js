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
    e.preventDefault();
    const payload = {
      ...formData,
      created_On: new Date(),
    };
    console.warn(payload);
    createComment(payload).then(() => router.push(`/post/comments/${id}`));
  };

  return (
    <Form onSubmit={handleSubmit} className="w-[50%] mx-auto mt-10">
      <Form.Group>
        <Form.Label className="font-semibold mb-2 fs-5">Add a comment</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          className="input rounded-none sm:text-sm sm:leading-6 mb-3"
          placeholder="Write your comment"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div className="flex justify-end">
        <Button className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-1 w-24 py-1" type="submit">
          Post
        </Button>
      </div>
    </Form>
  );
}
