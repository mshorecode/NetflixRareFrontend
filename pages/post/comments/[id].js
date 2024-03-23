import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../../../components/forms/CommentForm';
import { getPostComments } from '../../../api/commentApi';
import CommentCard from '../../../components/cards/CommentCard';

export default function PostComments() {
  const [comments, setComments] = useState([]);
  const [noComments, setNoComments] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getPostComments(id).then((resp) => {
      if (typeof (resp) === 'string') {
        setNoComments(true);
      } else (setComments(resp));
    });
  }, []);

  return (
    <Container className="p-4">
      <CommentForm />
      <div id="comment-container">
        {noComments ? (<p>Write the first comment!</p>)
          : (comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          )))}
      </div>
    </Container>
  );
}
