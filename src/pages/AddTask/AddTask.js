import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaCommentsDollar } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import './AddTask.css'

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHosKey = '9d6aa2076dbbb0db4cd5da13528fcb1a';
    // console.log(imageHosKey)

    const handleAddItem = (data) => {

        // console.log(data)
        alert('This may take some time. Please wait')
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

                    fetch('http://localhost:5000/allmedia', {

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
            })
    }
    return (
        <div className='flex justify-center items-center'>
            <div className='pr-5 taskbox w-auto p-7  '>
                <div className='flex justify-center text-3xl
                    font-bold h-auto'>
                    <h1 className='py-8'>Add item</h1></div>

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


                    <input className='btn btn-dark w-full mt-4 text-black' value="Add" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddTask;