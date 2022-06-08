import React from 'react'
import { useField, ErrorMessage } from 'formik'
import "./registerInput.css"

export default function RegisterInput({ placeholder, bottom, ...props }) {
    const [field, meta] = useField(props)
    return (
        <div className="input-wrap register-input-wrap">
           {meta.touched && meta.error && !bottom && (
            <div className="input-error">
                {
                    meta.touched && meta.error && <ErrorMessage name={field.name} />}
            </div>
            )}

            <input className={meta.touched && meta.error ? "input-error-border" : ""}
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props} />
            
            {meta.touched && meta.error && bottom && (
            <div className="input-error">
                {
                    meta.touched && meta.error && <ErrorMessage name={field.name} />}
            </div>
            )} 
        </div>
    )
}
