import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './EmailPassLogin.css';

const EmailPasslogin = () => {

    const [error, setError] = useState('')

    return (
        <div className='form-input-container'>
            <h2 className='form-title mb-4 fs-3 text-center'>Log In</h2>

            <Form className='container '>

                <Form.Group className="mb-4 form-input" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-4 form-input" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                </Form.Group>

                <Button className='btn-submit mb-2 container mt-2' variant="outline-dark" type="submit">
                    Log In
                </Button>
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            </Form>
            <p className='ps-2 text-dark'><small>New to Socialism? <Link to='/register'>Create new account</Link></small></p>

            <div className='loader container'>
                <Button className='mb-2 d-flex justify-content-center align-items-center' variant="outline-dark"><FaGoogle></FaGoogle> Log in with Google</Button>

            </div>
        </div>
    );
};

export default EmailPasslogin;