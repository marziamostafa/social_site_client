import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <button className="btn loading absolute left-1/2 ">loading</button>

        // return children
    }


    if (user) {
        return children;

    }



    return <Navigate to="/emailpasslogin" state={{ from: location }} replace></Navigate>;
};


export default PrivateRoute;