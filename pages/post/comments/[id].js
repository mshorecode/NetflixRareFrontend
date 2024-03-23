import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../../../components/forms/CommentForm';
import { getPostComments } from '../../../api/commentApi';
import CommentCard from '../../../components/cards/CommentCard';

export default function PostComments() {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getPostComments(id).then(setComments);
  });

  return (
    <Container className="p-4">
      <CommentForm />
      <div id="comment-container">
        {comments.map((c) => (
          <CommentCard comment={c} />
        ))}
      </div>
    </Container>
  );
}
