import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getUserById } from '../../api/userApi';
import { addSubscription, deleteSubscription, getSubscriptionId } from '../../api/subscriptionApi';
import { useAuth } from '../../utils/context/authContext';

export default function ViewUserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [subscription, setSubscription] = useState({});
  const subscribed = {
    follower_Id: user.id,
    author_Id: id,
    created_On: new Date(),
    ended_On: null,
  };

  const subscribeToUser = () => {
    getUserById(id).then(addSubscription(subscribed));
    getSubscriptionId(user.id, id).then((data) => setSubscription(data));
  };

  const unsubscribe = () => {
    deleteSubscription(subscription).then(() => setSubscription(null));
  };

  useEffect(() => {
    getUserById(id).then((data) => {
      setUserInfo(data);
    });
    getSubscriptionId(user.id, id).then((data) => setSubscription(data));
  }, [id, user.id]);

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
        <div>
          { subscription !== null ? (
            <Button onClick={unsubscribe}>Unsubscribe</Button>) : (
              <Button onClick={subscribeToUser}>Subscribe</Button>
          )}
        </div>
      </div>
    </div>
  );
}
