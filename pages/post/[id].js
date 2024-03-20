import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostCard from '../../components/cards/PostCard';
import { getPostDetails } from '../../api/postApi';

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    getPostDetails(id).then(setPost);
  }, [id]);

  return (
    <PostCard post={post} />
  );
}
