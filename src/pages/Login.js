import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post('http://localhost:5000/login', values);
      login(data.token);
      navigate.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
            <Field type="email" name="email" placeholder="Email" className="form-control" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className='mb-3'>
          <label for="exampleInputPassword1" className="form-label">Password</label>
            <Field type="password" name="password" placeholder="Password" className="form-control" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" className='btn btn-primary'>Login</button>
        </Form>
      </Formik>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
