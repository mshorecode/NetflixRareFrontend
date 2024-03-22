import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getAllUsers } from '../api/userApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);

  const viewProfile = (id) => {
    router.push(`/user/${id}`);
  };

  return (
    <div>
      <p className="text-3xl mt-5 mb-5 font-bold text-center">Authors</p>
      <div className="page-layout text-center gap-5">
        {users.map((user) => (
          <div key={user.id} className="flex-col gap-5">
            <div>
              <Image
                src={user.profile_Image_Url}
                alt={`${user.first_Name}, ${user.last_Name}`}
                height={120}
                width={120}
                className="rounded-full"
              />
            </div>
            <div className="flex-col gap-5">
              <p className="text-lg font-semibold">
                {user.first_Name} {user.last_Name}
              </p>
            </div>
            <Button type="button" onClick={() => viewProfile(user.id)} className="bg-slate-800 border-slate-800 rounded-sm text-white">View Profile</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
