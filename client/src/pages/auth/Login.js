import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import { authFn, googleAuthProvider } from '../../firebase'


const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('kkamyk@op.pl')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authFn.signInWithEmailAndPassword(email, password)
                .then(async result => {
                    const { user } = result;
                    const idTokenResult = await user.getIdTokenResult();

                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: { email: user.email, token: idTokenResult.token }
                    })
                })

            // send user info to our servero either update/create

            history.push('/')

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }

    }

    const googleLogin = () => {
        authFn.signInWithPopup(googleAuthProvider)
            .then(async result => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: { email: user.email, token: idTokenResult.token }
                })
                // send user info to our servero either update/create

                history.push('/')
            })
    }

    return (
        <div className="container">
            <h4>{loading ? 'Loading' : 'Login'}</h4>
            <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">Login with Google</button>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Email address</label>
                    <input className="form-control" type="email" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input className="form-control" type="password" name="" id="" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                </div>

                <button className="btn btn-raised btn-primary" disabled={!email || !password || loading}>Submit</button>

            </form>
        </div>
    );
}

export default Login;