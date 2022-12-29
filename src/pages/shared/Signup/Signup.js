import React, { useContext, useState } from 'react';

import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import './Signup.css'


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Signup = () => {


    const { createUser, googleLogin, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');

    const [error, setError] = useState('')

    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    // if (token) {
    //     navigate('/');
    // }

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password)

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully.')
                const userInfo = {
                    displayName: name,
                    email: email,

                }
                updateUser(userInfo)


            })
            .catch(error => {
                console.error(error);
                setSignUPError(error.message)
            })


    }

    const handleGoogleSignIn = () => {

        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: user.displayName,
                    email: user.email,
                }

                updateUser(userInfo)

            })
            .catch(error => {
                console.error(error);
            })

    }

    return (


        <div className='form-input-container'>
            <h2 className='form-title mb-4 fs-3 text-center'>Sign Up</h2>

            <Form className='container ' onSubmit={handleSignUp}>

                <Form.Group className="mb-4 form-input" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Your Name" required />
                </Form.Group>

                <Form.Group className="mb-4 form-input" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-4 form-input" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                </Form.Group>

                <Button className='btn-submit mb-2 container mt-2' variant="outline-dark" type="submit">
                    Sign Up
                </Button>
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            </Form>
            <p className='ps-2 text-dark'><small>Already have an account? <Link to='/emailpasslogin'>Login</Link></small></p>

            <div className='loader container'>
                <Button onClick={handleGoogleSignIn} className='mb-2 d-flex justify-content-center align-items-center' variant="outline-dark"><FaGoogle></FaGoogle> Sign up with Google</Button>

            </div>
        </div>
    );
};

export default Signup;