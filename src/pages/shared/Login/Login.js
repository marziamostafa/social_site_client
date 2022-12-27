import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './login.css'

const Login = () => {
    return (
        <div className='mt-4'>
            <h2 className='text-center mb-4 fs-3'>How do you want to log In?</h2>
            <ButtonGroup vertical className='form-control'>
                <Button className=' mb-2' variant="outline-dark"><Link to='/emailpasslogin' className='linker d-flex justify-content-center align-items-center'><AiOutlineMail></AiOutlineMail> Log in With Email & Password</Link></Button>
                <Button className='mb-2 d-flex justify-content-center align-items-center' variant="outline-dark" ><FaGoogle></FaGoogle> Log in with Google</Button>

            </ButtonGroup>

        </div>

    );
};

export default Login;