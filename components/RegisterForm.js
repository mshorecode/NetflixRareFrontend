import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';

function RegisterForm({ updateUser }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    email: '',
    bio: '',
    profile_Image_Url: user.fbUser.photoUrl,
    created_On: new Date().toLocaleDateString(),
    active: true,
    is_Staff: true,
    uid: user.uid,
  });

  useEffect(() => {
    if (user.uid) setFormData(user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData)
      .then(() => updateUser(user.uid))
      .then(router.push('/'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-16 flex justify-center">
      <Form onSubmit={handleSubmit} className="w-96">
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" name="first_Name" value={formData.first_Name} onChange={handleChange} className="rounded-none" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" name="last_Name" value={formData.last_Name} onChange={handleChange} className="rounded-none" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} className="rounded-none" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="textfield" placeholder="Enter bio" name="bio" value={formData.bio} onChange={handleChange} className="rounded-none" required />
        </Form.Group>
        <Button type="submit" className="bg-slate-800 border-slate-800 rounded-sm">
          {user.id ? 'Update' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    first_Name: PropTypes.string,
    last_Name: PropTypes.string,
    bio: PropTypes.string,
    profile_Image_Url: PropTypes.string,
    email: PropTypes.string,
    created_On: PropTypes.instanceOf(Date),
    active: PropTypes.bool,
    is_Staff: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
