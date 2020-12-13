import React, { useState } from 'react'


const Login = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => { }

    return (
        <div className="container">
            <div className="row p-5">
                <h4>Login</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Email address</label>
                        <input className="form-control" type="email" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;