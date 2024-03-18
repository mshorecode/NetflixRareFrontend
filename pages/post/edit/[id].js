import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostForm from '../../../components/forms/PostForm';
import { getPostDetails } from '../../../api/postApi';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getPostDetails(id).then(setEditItem);
  }, [id]);

  return (
    <PostForm post={editItem} />
  );
}
