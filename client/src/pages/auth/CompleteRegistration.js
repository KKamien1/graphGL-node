import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authFn } from '../../firebase'

import { AuthContext } from '../../context/authContext'

const CompleateRegistration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailFromRegistration'))
    }, [history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            toast.error('Email and password is required');
            return
        }

        try {
            const result = await authFn.signInWithEmailLink(email, window.location.href)

            console.log(result);
            if (result.user.emailVerified) {
                // remove from localStorage
                window.localStorage.removeItem('emailFromRegistration')
                let user = authFn.currentUser
                await user.updatePassword(password)

                // dispatch user with token email then redirect

                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: { email: user.email, token: idTokenResult.token }
                })

                // make api to save user in MongoDB
                history.push('/');
            }

        } catch (error) {
            console.log('register complete error', error.message);
            setLoading(false);
            toast.error(error.message)
        }

    }

    return (
        <div className="container">

            <h4>{loading ? 'Loading' : 'Complete regstration'}</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Email address</label>
                    <input className="form-control" type="email" name="" id="" value={email} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="">password</label>
                    <input className="form-control" type="password" name="" id="" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} placeholder="Enter password" />
                </div>
                <button className="btn btn-raised btn-primary" disabled={!email || loading}>Submit</button>

            </form>
        </div>

    );
}

export default CompleateRegistration;
