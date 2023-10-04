import React from 'react'
import { Formik , Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    let navigate = useNavigate();


    const validationSchema = Yup.object().shape(
        {
            title: Yup.string().required("You must input a title"),
            postText: Yup.string().required(),
            username: Yup.string().min(3).max(64).required()
        }
    );

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };

    const onSubmit = (data) => {
        console.log(data);
        // make api call to save post
        axios.post("http://localhost:3001/posts", data).then(response => {
            console.log('works');
            navigate('/');
        });
    };

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name='title' component='span'></ErrorMessage>
                <Field id="inputCreatePost" name="title" placeholder='Ex: title'></Field>

                <label>Post: </label>
                <ErrorMessage name='postText' component='span'></ErrorMessage>
                <Field id="inputCreatePost" name="postText" placeholder='Ex: desc'></Field>

                <label>Username: </label>
                <ErrorMessage name='username' component='span'></ErrorMessage>
                <Field id="inputCreatePost" name="username" placeholder='Ex: username'></Field>

                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost