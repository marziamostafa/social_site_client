import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import MyTaskCard from '../MyTask/MyTaskCard';

const CompletedTask = () => {
    const { user } = useContext(AuthContext)
    const [allInfo, setAllInfo] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/allmedia/${user?.email}`)
            .then(res => res.json())
            .then(data => setAllInfo(data))

    }, [user?.email])
    return (
        <div className='grid lg:grid-cols-1 mediaCard '>
            <h2 className='text-center fs-3 fw-bold my-4'>All My Completed Task:</h2>
            {
                allInfo?.map(info => <MyTaskCard
                    key={info._id}
                    info={info}
                ></MyTaskCard>)
            }
        </div>
    );
};

export default CompletedTask;