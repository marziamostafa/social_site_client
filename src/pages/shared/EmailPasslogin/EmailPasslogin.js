import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

import './EmailPassLogin.css';



const EmailPasslogin = () => {
    const { login, googleLogin, updateUser, setLoading } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'
    const [error, setError] = useState('')


    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error);
                setError(error.message)
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            })


    }




    const handleGoogleSignIn = () => {

        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error(error);
            })

    }
    return (
        <div className='form-input-container'>
            <h2 className='form-title mb-4 fs-3 text-center'>Log In</h2>

            <Form onSubmit={handleLogin} className='container '>

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
            <p className='ps-2 text-dark'><small>New to Socialism? <Link to='/signup'>Create new account</Link></small></p>

            <div className='loader container'>
                <Button onClick={handleGoogleSignIn} className='mb-2 d-flex justify-content-center align-items-center' variant="outline-dark"><FaGoogle></FaGoogle> Log in with Google</Button>

            </div>
        </div>
    );
};

export default EmailPasslogin;