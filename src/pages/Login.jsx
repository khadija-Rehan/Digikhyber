import React from 'react'
import Logo from "../assets/logo.png"
const Login = () => {
    return (
        <div className='login'>
            <div className="login-form">
                <div className='text-center mb-4'>

                    <img src={Logo} alt={Logo} />
                </div>
                <div className='text-center mb-4'>

                    <h5>CANDIDATE LOGIN
                    </h5>
                </div>
                <div className='mb-3'>

                    <label className='mb-2' htmlFor="">Email <span className='text-danger'>*</span></label>
                    <input className='form-control p-3' type="text" placeholder='Enter your email' />
                </div>
                <div className='mb-3'>

                    <label className='mb-2' htmlFor="">Password <span className='text-danger'>*</span></label>
                    <input className='form-control p-3' type="password" placeholder='Enter your password' />
                </div>
                <div className='text-end'>
                    <a href="">Forgot Password?</a>
                </div>
                <button className='btn-green register-btn btn btn-success w-100 mt-3 rounded-2'>Login</button>
                <div className='text-center mt-3 fs-6'>
                    <span>Don't have an account? </span>  <a href="">New Registration</a>
                </div>
            </div>
        </div>
    )
}

export default Login