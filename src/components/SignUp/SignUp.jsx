import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import firebase from '../../config/firebase';
import {ToastContainer, toast} from 'react-toastify';
import {Formik, Form, ErrorMessage, useField} from 'formik'
import AuthTextField from "../Controls/AuthTextField";
import {facebookProvider, githubProvider, googleProvider} from "../../config/authMethods";
import {ValidationSchema} from "../../ValidationSchema/ValidationSchema";
import CurrentPageContext from "../../Context/CurrentPageContext";


export default function SignUp(props) {

    const {signUpSchema} = ValidationSchema();
    const initValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    }

    const history = useHistory();
    const {setCurrentPage} = useContext(CurrentPageContext);
    setCurrentPage('Sign Up');

    const handleSignUpSubmit = async (values, onSubmitProps) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
            await firebase.auth().currentUser.updateProfile({
                displayName: values.name
            });
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm(initValues);
            history.push('/');

        } catch (error) {
            toast.error(`🦄 ${error.message}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <Formik
            initialValues={initValues}
            onSubmit={handleSignUpSubmit}
            validationSchema={signUpSchema}
        >
            <>
                <h1 className="login-title">Sign Up</h1>
                <div className="login-form">
                    <Form>
                        <AuthTextField type="text" placeholder='Type your email'
                                       name='email' icon='fas fa-envelope' label='Email'/>
                        <AuthTextField type="text" placeholder='Type your name'
                                       name='name' icon='fas fa-user' label='Name'/>
                        <AuthTextField input type="password" placeholder='Type the password'
                                       name='password' icon='fas fa-lock' label='Password'/>
                        <AuthTextField input type="password" placeholder='Type the confirm password'
                                       name='confirmPassword' icon='fas fa-lock' label='Confirm Password'/>
                        <button className="btn btn-login">
                            <div className="btn-login-text">SIGN UP</div>
                            <div className="overlay">
                            </div>
                        </button>
                        <div className='back-to-login'>
                            <NavLink to='/auth/login' className='back-to-login-text'>
                                Back To Login
                            </NavLink>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            bodyClassName="toastBody"
                        />
                    </Form>
                </div>
            </>
        </Formik>
    )
}
