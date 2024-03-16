import { useEffect, useState } from 'react';
import PostCard from '../components/cards/PostCard';
import { getAllPosts } from '../api/postApi';

function PostFeed() {
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

export default PostFeed;
