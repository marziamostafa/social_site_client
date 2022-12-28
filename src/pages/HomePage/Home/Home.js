import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Media from '../Media/Media';
import './Home.css'

const Home = () => {
    const datas = useLoaderData()
    // console.log(datas)
    return (
        <div className='grid lg:grid-cols-1  mediaCard'>
            {
                datas.map(data => <Media
                    key={data._id}
                    data={data}
                ></Media>)
            }
        </div>
    );
};

export default Home;