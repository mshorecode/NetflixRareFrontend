/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    checkUser(user.uid).then(setAuthUser);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
  };

  if (authUser.uid === user.uid) {
    router.push('/dashboard');
    return null;
  }

  return <RegisterForm user={user} updateUser={onUpdate} />;
}

export default Home;
