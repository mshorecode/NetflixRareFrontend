import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Navbar } from 'react-bootstrap';
import UserProfile from '../components/UserProfile';
import MyPosts from '../components/MyPosts';
import Tagmanager from './tagmanager';
import Categorymanager from './categorymanager';

export default function Dashboard() {
  const { pathname } = useRouter();
  const [ActiveComponent, setActiveComponent] = useState('my-posts');

  useEffect(() => {
    if (pathname.includes('/dashboard/subscribed')) {
      setActiveComponent('subscribed');
    } else if (pathname.includes('/dashboard/my-posts')) {
      setActiveComponent('my-posts');
    } else if (pathname.includes('/dashboard/categorymanager')) {
      setActiveComponent('categorymanager');
    } else if (pathname.includes('/dashboard/tagmanager')) {
      setActiveComponent('tagmanager');
    }
  }, [pathname]);

  return (
    <div className="flex gap-36">
      <div>
        <UserProfile />
      </div>
      <div className="flex-col w-full">
        <Navbar bg="dark" variant="dark" className="flex justify-evenly mt-4 rounded-sm">
          <Button onClick={() => setActiveComponent('my-posts')} className="text-white font-semibold border-none bg-transparent">My Posts</Button>
          <Button onClick={() => setActiveComponent('subscribed')} className="text-white font-semibold border-none bg-transparent">Subscribed Posts</Button>
          <Button onClick={() => setActiveComponent('tagmanager')} className="text-white font-semibold border-none bg-transparent">Tag Manager</Button>
          <Button onClick={() => setActiveComponent('categorymanager')} className="text-white font-semibold border-none bg-transparent">Category Manager</Button>
        </Navbar>
        <div className="flex-col w-full">
          {ActiveComponent === 'my-posts' && <MyPosts />}
          {ActiveComponent === 'subscribed' && <MyPosts />}
          {ActiveComponent === 'tagmanager' && <Tagmanager />}
          {ActiveComponent === 'categorymanager' && <Categorymanager />}
        </div>
      </div>
    </div>
  );
}
