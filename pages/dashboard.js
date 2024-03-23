import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import UserProfile from '../components/UserProfile';

export default function Dashboard() {
  return (
    <div className="flex gap-36">
      <div>
        <UserProfile />
      </div>
      <div className="flex-col w-full">
        <Navbar bg="dark" variant="dark" className="flex justify-evenly font-semibold text-white mt-4">
          <Link href="/posts/new">Subscribed Posts</Link>
          <Link href="/posts/new">My Posts</Link>
        </Navbar>
      </div>
    </div>
  );
}

// TODO: Render a list of posts based on the user's subscription and their posts
