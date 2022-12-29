import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Modalshow = ({ _id }) => {
    const imageHosKey = '9d6aa2076dbbb0db4cd5da13528fcb1a';
    const { user } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [allInfo, setAllInfo] = useState([])
    const [review, setReview] = useState(allInfo)

    useEffect(() => {
        fetch(`https://social-site-server-marziamostafa.vercel.app/allmedia/${user?.email}`)
            .then(res => res.json())
            .then(data => setAllInfo(data))

    }, [user?.email])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddItem = (data, id) => {
        console.log(data)
        const image = data.image[0];
        const fromData = new FormData();
        fromData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHosKey} `
        // console.log(url)

        fetch(url, {
            method: 'POST',
            body: fromData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData)
                if (imgData.success) {
                    console.log(imgData.data.url)


                    const item = {
                        name: data.taskName,
                        image: imgData.data.url,
                        postTime: data.postTime,

                        details: data.details,
                        email: user?.email,
                        link: data.taskLink

                    }

                    setReview(item)
                    fetch(`https://social-site-server-marziamostafa.vercel.app/delete/${_id}`, {

                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'

                        },
                        body: JSON.stringify(review)
                    })
                        .then(res => res.json())
                        .then(result => {

                            console.log(result)
                            if (data.modifiedCount > 0) {
                                toast.success('added Item successfully')
                                window.location.reload()
                            }
                            // navigate('/dashboard/myaddedproducts')
                        })
                }
            })


    }

    // const handleInputChange = event => {
    //     const newname = event.target.name.value
    //     const newimage = event.target.image.value
    //     const newpostTime = event.target.postTime.value
    //     const newdetails = event.target.details.value
    //     const newlink = event.target.link.value

    //     const newReview = { ...review }
    //     newReview.name = newname
    //     newReview.image = newimage
    //     newReview.postTime = newpostTime
    //     newReview.details = newdetails
    //     newReview.link = newlink
    //     console.log(newReview)
    //     // setReview(newReview)
    // }
    return (
        <div className=''>
            <Button className='w-full btn btn-dark text-black' variant="primary" onClick={handleShow}>
                Update This Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Field</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form onSubmit={handleSubmit(handleAddItem)} >

                        <div className="form-control max-w-screen-md my-8">
                            <label className="label"> <span className="label-text">Task Name: </span></label>
                            <input type="text" {...register("taskName", {
                                required: "Required"
                            })} className="input input-bordered w-full " />
                            {errors.taskName && <p className='text-red-500'>{errors.taskName.message}</p>}
                        </div>


                        <div className="form-control max-w-screen-md my-8">
                            <label className="label"> <span className="label-text">Details </span></label>
                            <br />
                            <textarea type="text" {...register("details", {
                                required: "Required"
                            })} className="input input-bordered w-full textarea" />
                            {errors.details && <p className='text-red-500'>{errors.details.message}</p>}
                        </div>

                        <div className="form-control max-w-screen-md my-8">
                            <label className="label"> <span className="label-text">Used Tools </span></label>
                            <br />
                            <textarea type="text" {...register("usedTools", {
                                required: "Required"
                            })} className="input input-bordered w-full textarea" />
                            {errors.usedTools && <p className='text-red-500'>{errors.usedTools.message}</p>}
                        </div>


                        <div className="form-control  max-w-screen-md my-8">
                            <label className="label"> <span className="label-text">Write date and time</span></label>
                            <input type="text" {...register("postTime", {
                                required: 'Required'
                            })} className="input input-bordered w-full " />
                            {errors.postTime && <p className='text-red-500'>{errors.postTime.message}</p>}
                        </div>

                        <div className="form-control  max-w-screen-md my-8">
                            <label className="label"> <span className="label-text">Task Link</span></label>
                            <input type="text" {...register("taskLink", {

                            })} className="input input-bordered w-full " />
                            {errors.taskLink && <p className='text-red-500'>{errors.taskLink.message}</p>}
                        </div>


                        <div className="form-control  max-w-screen-md">
                            <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
                            <input type="file" {...register("image", {
                                required: 'Required'
                            })} className="input input-bordered w-full " />
                            {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                        </div>

                        <Button className='text-black btn btn-dark w-full mt-4' type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>


                    </form>


                </Modal.Body>


                <Modal.Footer>
                    <Button className='text-black' onClick={handleClose}>
                        Close
                    </Button>


                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default Modalshow;