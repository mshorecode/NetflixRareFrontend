import { Button } from 'react-bootstrap';
import UserProfile from '../components/UserProfile';

export default function Dashboard() {
  return (
    <div className="flex gap-36">
      <div>
        <UserProfile />
      </div>
      <div className="flex-col">
        <Button>Subscirbed Posts</Button>
        <Button>My Posts</Button>
      </div>
    </div>
  );
}

// TODO: Render a list of posts based on the user's subscription and their posts
