import React, { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState({});

  const onUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
  };

  useEffect(() => {
    checkUser(user.uid).then(setAuthUser);
  }, []);

  return (
    <>
      { authUser.uid === user.uid ? (
        <div className="flex mt-12">
          <h1 className="font-semibold fs-3">Welcome {user.first_Name}</h1>
        </div>
      ) : (<RegisterForm user={user} updateUser={onUpdate} />
      )}
    </>
  );
}

export default Home;
