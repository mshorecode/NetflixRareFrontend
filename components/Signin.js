import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1 className="font-semibold fs-5">Hi there!</h1>
      <p className="font-semibold fs-5">Click the button below to login!</p>
      <Button type="button" size="sm" className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-2 w-[15%] mx-auto" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
