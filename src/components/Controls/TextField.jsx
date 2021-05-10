import React from 'react';
import {ErrorMessage, useField} from 'formik'
 

export default function TextField({label, ...props}){
    const [field, meta] = useField(props);
     
    
    return (         
        <div className = 'control-group' >
            <label htmlFor={field.name}>{label}</label>
            <input {...field} {...props} autoComplete = 'off' className = 'form-control shadow-none'/>
            <ErrorMessage name = {field.name} > 
                { msg => <div className = 'error-input'>{msg}</div> }
            </ErrorMessage>
        </div>
    )
}
