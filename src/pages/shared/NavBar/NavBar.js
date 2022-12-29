import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';


const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)

    const menuItems = <React.Fragment>
        <li className='px-4 pt-2'><Link to="/">Media</Link></li>
        <li className='px-4 pt-2'><Link to="/addtask">Add Task</Link></li>
        <li className='px-4 pt-2'><Link to="/mytask">My Task</Link></li>
        <li className='px-4 pt-2'><Link to="/completedtask">Completed Task</Link></li>

        <li className='px-4 pt-2'><Link to="/mytask">Not Completed</Link></li>

    </React.Fragment>

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );


    const toggleTheme = () => {

        if (theme === 'light') {
            setTheme('dark');
            // document.body.style.backgroundColor = "#fff"
        }
        else {
            setTheme('light')
            // document.body.style.backgroundColor = "#333"
        }

    }
    useEffect(() => {
        localStorage.setItem('theme', theme);

        document.body.className = theme;
    }, [theme])

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.error(error);
            })
    }





    return (
        <Navbar bg="light" expand="lg">
            <Container fluid className='d-flex align-items-center'>
                <Navbar.Brand href="#" className='fs-3 fw-bold'>Socialism</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >


                        {menuItems}
                        <Button className="" onClick={toggleTheme} variant="outline-dark">
                            {theme === 'light' ?
                                <><FaSun></FaSun></>
                                :
                                <><FaMoon></FaMoon></>}
                        </Button>
                    </Nav>

                    <Form className="d-flex align-items-center">

                        {user?.uid ?

                            <>
                                <p className='mr-1'>{user?.email}</p>
                                <Button onClick={handleLogOut} variant="outline-success">Logout</Button></>
                            :
                            <Button variant="outline-success"><Link to='/login'>LogIn</Link></Button>
                        }
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;