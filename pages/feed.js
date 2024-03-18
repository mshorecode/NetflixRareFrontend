import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PostCard from '../components/cards/PostCard';
import { getAllPosts } from '../api/postApi';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Button
        className="flex post-btn"
        onClick={() => router.push('/post/new')}
      >Make a post
      </Button>
      <div
        className="flex flex-col-reverse"
      >
        {posts.map((p) => (
          <PostCard post={p} key={p.id} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}
