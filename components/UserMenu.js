/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();

  const dashboardConfessional = () => {
    router.push('/dashboard');
  };

  const adminConfessional = () => {
    router.push('/admin');
  };

  return (
    !user.is_Staff ? (
      <Dropdown
        align="end"
        navbar="true"
        className="last:mt-auto"
      >
        <Dropdown.Toggle className="border-none bg-transparent">
          <img src={user.fbUser.photoURL} alt="Profile Image" className="h-10 w-10 rounded-full" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="rounded-sm">
          <Dropdown.Item onClick={dashboardConfessional}>Dashboard</Dropdown.Item>
          <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Dropdown
        align="end"
        navbar="true"
        className="last:mt-auto"
      >
        <Dropdown.Toggle className="border-none bg-transparent">
          <img src={user.fbUser.photoURL} alt="Profile Image" className="h-10 w-10 rounded-full" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="rounded-sm">
          <Dropdown.Item onClick={dashboardConfessional}>Dashboard</Dropdown.Item>
          <Dropdown.Item onClick={adminConfessional}>Admin Panel</Dropdown.Item>
          <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  );
}
