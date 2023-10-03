import React from 'react'
import { Formik , Form, Field, ErrorMessage} from 'formik';

function CreatePost() {
  return (
    <div className='createPostPage'>
        <Formik>
            <Form className='formContainer'>
                <label>Title: </label>
                <Field id="inputCreatePost" name="title" placeholder='Ex: title'></Field>
                <label>Post: </label>
                <Field id="inputCreatePost" name="postText" placeholder='Ex: desc'></Field>
                <label>Username: </label>
                <Field id="inputCreatePost" name="username" placeholder='Ex: username'></Field>

                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost