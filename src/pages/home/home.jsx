import React from 'react';
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import "./home.css"

export default function Home() {
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-wrap">
                    <div className="login-1">
                        <img src="../../icons/digital-hub.svg" alt="logo"></img>
                        <span>Digital Hub collects your memories and help share it with the people in your life.</span>
                    </div>
                    <div className="login-2">
                        <div className="login-2-wrap">
                            <Formik>
                                {(formik) => (
                                    <Form>
                                        <input type="text" />
                                        <input type="text" />
                                        <button type="submit" className="pink-btn">Log In</button>
                                    </Form>
                                    )
                                }
                            </Formik>
                            <Link to="/forgot" className="forgot-password"> Forgot your password?</Link>
                            <div className="sign-splitter"></div>
                            <button className="pink-btn open-signup">Create Account</button>
                        </div>
                    </div>
                </div>
                <div className="register"></div>
            </div>

            
        </div>
    )
}
