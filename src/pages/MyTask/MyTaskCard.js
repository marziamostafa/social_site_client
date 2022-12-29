
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modalshow from './Modalshow';



const MyTaskCard = ({ info }) => {
    const { image, details, postTime, name, tools, link, _id } = info
    // console.log(_id)
    const [deleteTask, setDeleteTask] = useState([])
    const [categoryComments, setCategoryComments] = useState('')
    const [filtereComment, setFiltereComment] = useState([])

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleDeleteTask = id => {

        console.log(id)
        const proceed = window.confirm('Do you want to delete this Buyer?')
        if (proceed) {
            fetch(`http://localhost:5000/delete/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Deleted Successfully')
                        const remaining = deleteTask.filter(dt => dt._id !== id)
                        setDeleteTask(remaining)
                        window.location.reload()
                    }
                })
        }
    }


    useEffect(() => {
        fetch(`http://localhost:5000/comments`)
            .then(res => res.json())
            .then(data => {
                setCategoryComments(data)


                const array = categoryComments.filter(info => info.taskname === name)


                setFiltereComment(array)

            })

    }, [categoryComments, name])




    return (
        <div className="card mb-3 max-w-screen-lg justify-items-center bg-lime-200">
            <img src={image} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title fs-4 fw-bold">{name}</h5>
                <p><small>{postTime}</small></p>
                <p className="card-text">{details}</p>
                <p className="card-text">Tools: {tools}</p>
                <button className='btn btn-secondary'><a href={link} >Visit Website</a></button>



                <div className="card text-bg-light mb-3 mt-4" >
                    <div className="card-header">Comments {filtereComment.length}</div>

                    {
                        filtereComment.map(dt => <div class="card">
                            <div class="card-header" key={dt._id}>
                                {dt?.email}
                            </div>
                            <div class="card-body">
                                <p class="card-text">{dt?.comment}</p>

                            </div>
                        </div>)
                    }

                </div>
            </div>
            <input onClick={() => handleDeleteTask(_id)} className='btn btn-dark w-full mt-4 text-black' value="Delete this Task" type="submit" />


            {
                <Modalshow

                    _id={_id}                ></Modalshow>
            }

        </div>
    );
};

export default MyTaskCard;