import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const navigate = useNavigate();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().min(20, 'Name must be at least 20 characters').max(60).required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    address: Yup.string().max(400, 'Address too long').required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/register', values);
      navigate.push('/login');
    } catch (err) {
      setError('Error creating account');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', address: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='mb-3'>
            <label for="exampleInputName1" className="form-label">Name</label>
            <Field type="text" name="name" placeholder="Name" className="form-control" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className='mb-3'>
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <Field type="email" name="email" placeholder="Email" className="form-control" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className='mb-3'>
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <Field type="password" name="password" placeholder="Password" className="form-control" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div className='mb-3'>
            <label for="exampleInputAddress1" className="form-label">Address</label>
            <Field type="text" name="address" placeholder="Address" className="form-control" />
            <ErrorMessage name="address" component="div" />
          </div>
          <button type="submit" className='btn btn-primary'>Signup</button>
        </Form>
      </Formik>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Signup;
