import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import MyTaskCard from './MyTaskCard';
import './MyTask.css'

const MyTask = () => {
    const { user } = useContext(AuthContext)
    const [allInfo, setAllInfo] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/allmedia/${user?.email}`)
            .then(res => res.json())
            .then(data => setAllInfo(data))

    }, [user?.email])
    // console.log(allInfo)

    return (
        <div className='grid lg:grid-cols-1 mediaCard'>
            {
                allInfo?.map(info => <MyTaskCard
                    key={info._id}
                    info={info}
                ></MyTaskCard>)
            }
        </div>

    );
};

export default MyTask;