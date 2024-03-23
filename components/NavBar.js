/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <div>
        <Navbar.Brand>Rare Posts</Navbar.Brand>
      </div>
      <div className="flex right-nav fw-semibold">
        <Nav className="gap-1">
          <Link passHref href="/users">
            <Nav.Link className="pt-[11px] text-xl">Authors</Nav.Link>
          </Link>
          <Link passHref href="/feed">
            <Nav.Link className="pt-[11px] text-xl">Posts</Nav.Link>
          </Link>
          <Link passHref href="/post/new">
            <Nav.Link className="pt-[11px] text-xl flex gap-1">
              <IoCreateOutline className="w-6 h-6 mt-[2px]" /> Create
            </Nav.Link>
          </Link>
        </Nav>
        <UserMenu />
      </div>
    </Navbar>
  );
}
