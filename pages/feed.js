/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllPosts } from '../api/postApi';
import PostCard from '../components/cards/PostCard';

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
    <div className="flex flex-col justify-center m-2">
      <Button
        className="place-self-center rounded-none"
        onClick={() => router.push('/post/new')}
      >Make a post
      </Button>
      <div
        className="flex flex-col-reverse justify-center content-center m-2"
      >
        {posts.map((p) => (
          <PostCard post={p} key={p.id} onUpdate={getPosts} />
        ))}
      </div>
    </div>
  );
}
