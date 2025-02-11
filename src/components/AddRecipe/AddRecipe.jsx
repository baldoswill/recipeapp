import firebase from '../../config/firebase';
import React, { useRef, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from 'formik'
import TextField from '../Controls/TextField';
import TextAreaField from '../Controls/TextAreaField';
import { ValidationSchema } from '../../ValidationSchema/ValidationSchema';
import UploadHelper from '../../Utilities/UploadHelper';
import CurrentPageContext from "../../Context/CurrentPageContext";

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
    display: flex;      
    text-align: center;         
    position: absolute;          
    left: 37%;                    
    bottom: 41%;                 
    transform: translateX(-50%);     
    border-color: #C71F38;
    background-color: pink;
    z-index: 999;
    `;

export function AddRecipe() {

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    


    const firestore = firebase.firestore();
    //  const storageRef = firebase.storage();
    const ref = useRef('');
    const { addRecipeSchema } = ValidationSchema();
    const { uploadTaskPromise } = UploadHelper();

    const { setCurrentPage } = useContext(CurrentPageContext);

    useEffect(() => {
        setCurrentPage('Add Recipe');
    }, [])


    const initValues = {
        title: '',
        ingredients: '',
        preparation: '',
        time: '',
        servings: '',
        picture: ''
    }

    const handleSubmit = async (values, onSubmitProps) => {

        try {
            setLoading(true);
       
            const imageUrl = await uploadTaskPromise('All_Files/', values.picture.name, values.picture);
            values.imageUrl = imageUrl;
            values.ingredients = values.ingredients.replace("\\n", "\n");
            values.preparation = values.preparation.replace("\\n", "\n");
            values.userId = await firebase.auth().currentUser.uid;

            ref.current.value = ""
            delete values.picture;

            await firestore.collection('recipes').add(values);

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm(initValues);

            toast.success('🦄 Successfully added a new recipe!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`🦄 ${error.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setLoading(false);       

    }

    return (
        <div className = {loading ? 'add-recipe-form saving' : 'add-recipe-form'}>
            <Formik
                initialValues={initValues}
                validationSchema={addRecipeSchema}
                onSubmit={handleSubmit}
            >
                {formProps => (
                    <>
                        <h2 className="daily-recipes-title">Add Recipe</h2>
                        <ClipLoader color={color} loading={loading} css={override} size={150} />
                        <Form>
                            <TextField label='Title' type='text' name='title' />
                            <TextAreaField label='Ingredients' name='ingredients' />
                            <TextAreaField label='Preparation' name='preparation' />
                            <TextField label='Time of Preparation (Minutes)' type='number' name='time' />
                            <TextField label='Servings (Persons)' type='number' name='servings' />
                            <div className="control-group">
                                <label htmlFor="preparation" className='input-label'>Recipe Image</label>
                                <input type="file" id="file" onChange={event => formProps.setFieldValue('picture', event.target.files[0])} name='picture' ref={ref} />
                                <ErrorMessage name='picture' >
                                    {msg => <div className='error-input'>{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="control-group">
                                <button className= 'btn btn-add' disabled={loading}>Add New Recipe</button>
                            </div>
                        </Form>
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
                    </>
                )}
            </Formik>
        </div>
    )
}

export default withRouter(AddRecipe);