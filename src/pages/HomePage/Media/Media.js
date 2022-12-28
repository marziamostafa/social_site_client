import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Comments from './Comments';
import './Media.css'

const Media = ({ data }) => {
    const { user } = useContext(AuthContext)
    const { image, details, postTime, name, tools, link, _id } = data

    const [categoryComments, setCategoryComments] = useState('')
    const [filtereComment, setFiltereComment] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/comments`)
            .then(res => res.json())
            .then(data => {
                setCategoryComments(data)

                // if(categoryComments.taskname)
                const array = categoryComments.filter(info => info.categoryId === _id)

                // const filtered = array
                // console.log(filtered)
                setFiltereComment(array)

            })

    }, [categoryComments, _id])


    // console.log(filtereComment)

    const handleComment = (event) => {
        event.preventDefault();
        const form = event.target;
        const comments = form.comment.value;
        const taskName = name;
        const email = user?.email
        console.log(comments, taskName, email)

        const item = {
            categoryId: _id,
            comment: comments,
            taskname: taskName,
            email: user?.email,

        }

        fetch('http://localhost:5000/comments', {

            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('usersToken')}`

            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(result => {

                console.log(result)
                toast.success('added Item successfully')
                window.location.reload()
                // navigate('/dashboard/myaddedproducts')
            })


    }
    return (
        <div className="card mb-3 max-w-screen-lg justify-items-center ">
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
                        // filtereComment.map(dt => <div class="card">
                        //     <div class="card-header" key={dt._id}>
                        //         {dt?.email}
                        //     </div>
                        //     <div class="card-body">
                        //         <p class="card-text">{dt?.comment}</p>

                        //     </div>
                        // </div>)
                    }



                    <div className="card-body">

                        <p className="card-text"></p>
                    </div>


                    <form class="mb-3" onSubmit={handleComment}>

                        <textarea className="form-control" name="comment" id="exampleFormControlTextarea1" rows="3"></textarea>

                        <input className='btn btn-dark mt-4 text-black' value="Comment" type="submit" />
                    </form>

                </div>
            </div>
        </div>

    );
};

export default Media;