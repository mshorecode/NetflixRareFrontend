import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { getUserById } from '../../api/userApi';

export default function ViewUserProfile() {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getUserById(id).then((data) => {
      setUserInfo(data);
    });
  }, [id]);

  console.warn(userInfo);

  const formattedDate = moment(userInfo.created_On).format('LL');

  return (
    <div>
      <div>
        <p className="text-3xl mt-5 mb-2 font-bold">
          {userInfo.first_Name} {userInfo.last_Name}
        </p>
        <div className="flex-col gap-[6px] mb-2">
          <p className="text-lg font-semibold">
            Email:
          </p>
          <p className="text-md ml-3">
            {userInfo.email}
          </p>
        </div>
        <div className="flex-col gap-[6px] mb-2">
          <p className="text-lg font-semibold">
            Bio:
          </p>
          <p className="text-md ml-3">
            {userInfo.bio}
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
            {userInfo.is_Staff ? 'Admin' : 'User'}
          </p>
        </div>
      </div>
    </div>
  );
}
