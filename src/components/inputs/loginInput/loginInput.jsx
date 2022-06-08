import React from 'react'
import "./loginInput.css"
import { useField, ErrorMessage } from 'formik'

export default function LoginInput({ placeholder, bottom, ...props }) {
    const [field, meta] = useField(props)
    return (
        <div className="input-wrap">
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
