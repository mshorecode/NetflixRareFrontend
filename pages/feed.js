import { useEffect, useState } from 'react';
import PostCard from '../components/cards/PostCard';
import { getAllPosts } from '../api/postApi';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
    console.warn(posts);
  }, []);

  return (
    <>
      {posts.map((p) => (
        <PostCard post={p} key={p.id} />
      ))}
    </>
  );
}
