import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './login.css'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { signIn, googleLogin, updateUser, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
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
        <div className='mt-4'>
            <h2 className='text-center mb-4 fs-3'>How do you want to log In?</h2>
            <ButtonGroup onSubmit={handleLogin} vertical className='form-control'>
                <Button className=' mb-2' variant="outline-dark"><Link to='/emailpasslogin' className='linker d-flex justify-content-center align-items-center'><AiOutlineMail></AiOutlineMail> Log in With Email & Password</Link></Button>
                <Button onClick={handleGoogleSignIn} className='mb-2 d-flex justify-content-center align-items-center' variant="outline-dark" ><FaGoogle></FaGoogle> Log in with Google</Button>

            </ButtonGroup>

        </div>

    );
};

export default Login;