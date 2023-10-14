import React from 'react';
import { Formik , Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {

    const validationSchema = Yup.object().shape(
        {
            username: Yup.string().min(3).max(64).required(),
            password: Yup.string().min(4).max(20).required()
        }
    );

    const initialValues = {
        password: "",
        username: ""
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((res) => {
            console.log(data);
        });
    };

  return (
    <div>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
             
                <label>Username: </label>
                <ErrorMessage name='username' component='span'></ErrorMessage>
                <Field id="inputCreatePost" name="username" placeholder='Ex: username'></Field>

                <label>Password: </label>
                <ErrorMessage name='password' component='span'></ErrorMessage>
                <Field id="inputCreatePost" name="password" type="password" placeholder='your password'></Field>


                <button type="submit">Register</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration;