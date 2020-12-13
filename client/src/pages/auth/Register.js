import React, { useState } from 'react'

import { authFn } from "../../firebase";
import { toast } from 'react-toastify';





const Register = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true,
        }
        const result = await authFn.sendSignInLinkToEmail(email, config);
        console.log('result', result);
        /// show toast notification to user about emai sent
        toast.success(`Email is send to ${email} - check it!`)
        // save user email to local storage

        window.localStorage.setItem('emailFromRegistration', email);

        // clear state
        setEmail('');
        setLoading(false)
    }
    return (
        <div className="container">

            <h4>{loading ? 'Loading' : 'Register'}</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Email address</label>
                    <input className="form-control" type="email" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} placeholder="Enter email" />
                </div>
                <button className="btn btn-raised btn-primary" disabled={!email || loading}>Submit</button>

            </form>

        </div>
    );
}

export default Register;