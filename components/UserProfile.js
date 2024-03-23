import Image from 'next/image';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  const formattedDate = moment(user.created_On).format('LL');

  return (
    <div>
      <p className="text-3xl mt-5 mb-2 font-bold">
        {user.first_Name} {user.last_Name}
      </p>
      <div className="flex mb-2">
        <Image src={user.profile_Image_Url} alt="`{user.first_Name}, {user.last_Name}`" height={120} width={120} className="rounded-full" />
      </div>
      <div className="flex-col gap-[6px] mb-2">
        <p className="text-lg font-semibold">
          Email:
        </p>
        <p className="text-md ml-3">
          {user.email}
        </p>
      </div>
      <div className="flex-col gap-[6px] mb-2">
        <p className="text-lg font-semibold">
          Bio:
        </p>
        <p className="text-md ml-3">
          {user.bio}
        </p>
      </div>
      <div className="flex-col gap-[6px] mb-2">
        <p className="text-lg font-semibold">
          Created On:
        </p>
        <p className="text-md ml-3">
          {formattedDate}
        </p>
      </div>
      <div className="flex-col gap-[6px]">
        <p className="text-lg font-semibold">
          Role:
        </p>
        <p className="text-md ml-3">
          {user.is_Staff ? 'Admin' : 'User'}
        </p>
      </div>
      <div>
        <Button type="button" className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-4">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
