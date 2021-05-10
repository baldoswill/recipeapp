import React, {useContext, useEffect} from 'react';
import firebase from '../../config/firebase';
import {Form, Formik} from 'formik';
import {NavLink, useHistory} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import SocialAuthProvider from '../Auth/SocialAuthProvider';
import {facebookProvider, githubProvider, googleProvider} from '../../config/authMethods';
import AuthContext from '../../Context/AuthContext';
import {ValidationSchema} from "../../ValidationSchema/ValidationSchema";
import AuthTextField from "../Controls/AuthTextField";
import CurrentPageContext from "../../Context/CurrentPageContext";
import useScript from "../../Utilities/useScript";


export default function Login() {
    useScript('../assets/js/main.js');

    useEffect(() => {
        setCurrentPage('Login');
    }, [])

    const {loginSchema} = ValidationSchema();
    const initValues = {
        email: '',
        password: ''
    }
    const history = useHistory();
    const {setUserData} = useContext(AuthContext);

    const {setCurrentPage} = useContext(CurrentPageContext);
    

    const handleOnClick = async (provider) => {
        try{
            const resp = await SocialAuthProvider(provider);
            let userDetails = resp.providerData[0];
            userDetails.isLoggedIn = true;
            setUserData(userDetails);
            history.push("/");
        }catch(error){
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

    const handleLoginSubmit = async (values, onSubmitProps) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm(initValues);
            let userDetails = await firebase.auth().currentUser.providerData[0];
            userDetails.isLoggedIn = true;
            setUserData(userDetails);
            history.push("/");
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
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
        >
            <>
                <h1 className="login-title">Login</h1>
                <div className="login-form">
                    <Form>
                        <AuthTextField type="text" placeholder='Type your email'
                                       name='email' icon = 'fas fa-envelope' label = 'Email'/>
                        <AuthTextField input type="password" placeholder='Type your password'
                                        name='password' icon = 'fas fa-lock' label='Password'/>
                        <NavLink to='/auth/forgot-password'>
                            <p className="forgot-password-text">Forgot Password </p>
                        </NavLink>
                        <button className="btn btn-login">
                            <div className="btn-login-text">LOGIN</div>
                            <div className="overlay">
                            </div>
                        </button>
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
                        <div className='social-media-signup'>
                            <p>Or Sign Up Using</p>
                            <div className="social-media-icons">
                                <i className="fab fa-facebook" onClick={e => handleOnClick(facebookProvider)}></i>
                                <i className="fab fa-google" onClick={e => handleOnClick(googleProvider)}></i>
                                <i className="fab fa-github" onClick={e => handleOnClick(githubProvider)}></i>
                            </div>
                        </div>
                        <div className='regular-signup'>
                            <p>Or Sign Up Directly To Our Website</p>
                            <NavLink to='/auth/signup' className="text-signup">
                                SIGN UP
                            </NavLink>
                        </div>
                    </Form>
                </div>
            </>
        </Formik>

    )
}
