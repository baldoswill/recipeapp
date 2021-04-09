import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import firebase from '../../config/firebase';
import {Form, Formik} from "formik";
import AuthTextField from "../Controls/AuthTextField";
import {toast, ToastContainer} from "react-toastify";
import {ValidationSchema} from "../../ValidationSchema/ValidationSchema";

export default function SignUp(props) {

    const initValues = {
        email: ''
    }
    const {forgotPasswordSchema} = ValidationSchema();
    const history = useHistory();

    const handleSubmit = async (values, onSubmitProps) => {
        try {
            await firebase.auth().sendPasswordResetEmail(values.email);
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
            onSubmit={handleSubmit}
            validationSchema={forgotPasswordSchema}
        >
            <>
                <h1 className="login-title">Login</h1>
                <div className="login-form">
                    <Form>
                        <AuthTextField type="text" placeholder='Type your email'
                                       name='email' icon='fas fa-envelope' label='Email'/>
                        <button className="btn btn-signup">
                            <span className="btn-signup-text">SEND PASSWORD RESET EMAIL</span>
                        </button>
                        <div className='back-to-login'>
                            <NavLink to='/auth/signup'>
                                <p className='back-to-login-text'>Create New Account Instead?</p>
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
