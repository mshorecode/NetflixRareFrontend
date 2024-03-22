import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Navbar } from 'react-bootstrap';
import UserProfile from '../components/UserProfile';
import PostForm from '../components/forms/PostForm';
import PostCard from '../components/cards/PostCard';

export default function Dashboard() {
  const { pathname } = useRouter();
  const [ActiveComponent, setActiveComponent] = useState('my-posts');

  useEffect(() => {
    if (pathname.includes('/dashboard/subscribed')) {
      setActiveComponent('subscribed');
    } else if (pathname.includes('/dashboard/my-posts')) {
      setActiveComponent('my-posts');
    }
  }, [pathname]);

  return (
    <div className="flex gap-36">
      <div>
        <UserProfile />
      </div>
      <div className="flex-col w-full">
        <Navbar bg="dark" variant="dark" className="flex justify-evenly font-semibold text-white mt-4">
          <Button onClick={() => setActiveComponent('subscribed')}>Subscribed Posts</Button>
          <Button onClick={() => setActiveComponent('my-posts')}>My Posts</Button>
        </Navbar>
        <div className="flex-col w-full">
          {ActiveComponent === 'subscribed' && <PostCard />}
          {ActiveComponent === 'my-posts' && <PostForm />}
        </div>
      </div>
    </div>
  );
}

// TODO: Render a list of posts based on the user's subscription and their posts
