import React from 'react';
import {ErrorMessage, useField, Field} from 'formik'

export default function TextAreaField({label, ...props}){
    const [field, meta] = useField(props);
    return (
        <div className = 'control-group' >
            <label htmlFor={field.name}>{label}</label>
            <Field
                {...field} {...props}
                autoComplete = 'off'
                className = 'form-control shadow-none'
                component="textarea"
                rows="7"
            />
            <ErrorMessage name = {field.name} >
                { msg => <div className = 'error-input'>{msg}</div> }
            </ErrorMessage>
        </div>
    )
}
