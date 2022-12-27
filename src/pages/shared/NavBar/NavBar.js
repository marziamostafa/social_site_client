import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


const NavBar = () => {

    const menuItems = <React.Fragment>
        <li className='px-4'><Link to="/">Media</Link></li>
        <li className='px-4'><Link to="/addtask">Add Task</Link></li>
        <li className='px-4'><Link to="/mytask">My Task</Link></li>
        <li className='px-4'><Link to="/completedtask">Completed Task</Link></li>

        {/* {user?.uid ?
            <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button className='btn btn-outline' onClick={handleLogOut}>Sign out</button></li>
            </>
            : <li><Link className='btn btn-outline' to="/login">Login</Link></li>} */}
    </React.Fragment>


    return (
        <Navbar bg="light" expand="lg">
            <Container fluid className='d-flex'>
                <Navbar.Brand href="#" className='fs-3 fw-bold'>Socialism</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >


                        {menuItems}
                    </Nav>
                    <Form className="d-flex">

                        <Button variant="outline-success">LogIn</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;