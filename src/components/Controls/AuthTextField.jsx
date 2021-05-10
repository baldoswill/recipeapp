import React from 'react';
import {ErrorMessage, useField} from 'formik'


export default function AuthTextField({label, ...props}) {
    const [field, meta] = useField(props);
    
    return (
        <>
            <div className="form-control">
                <label htmlFor={field.name}>{label}</label>
                <input {...field} {...props}  autoComplete='off' className='form-control shadow-none'/>          
                <i className={props.icon}></i>
                <span className="effect-border"></span>
            </div>
            <ErrorMessage name={field.name}>
                {msg => <div className='error-input'>{msg}</div>}
            </ErrorMessage>
        </>
    )
}
