/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postApi';
import PostCard from '../components/cards/PostCard';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <>
      {posts.map((p) => (
        <PostCard post={p} key={p.id} />
      ))}
    </>
  );
}
