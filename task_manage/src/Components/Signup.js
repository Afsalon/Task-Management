import { Link, useNavigate } from 'react-router-dom';
import './css/signup.css';
import { useEffect } from 'react';
import { SignupUser } from '../Services/SignupUser';

const Signup = () =>
{

    const nav = useNavigate()

    const signup_call = (e) =>
    {
        e.preventDefault()
        let formData = new FormData()
        formData.append('username', e.target[0].value)
        formData.append('email', e.target[1].value)
        formData.append('password', e.target[2].value)
        SignupUser(formData).then((r) =>
        {
            alert("User created you may now login")
        }).catch((r) =>
        {
            console.log(r)
        })
    }
    useEffect(() =>
    {
        if (localStorage.getItem('tokens'))
        {
            nav('signup')
        }
    }, [nav])

    return (
        <>

            <form onSubmit={(e) => signup_call(e)} className="login-form">
                <div className='login-form-header'>
                    Task <sub>[Manager]</sub>
                </div>
                <div className='login-form-body'>
                    <input className="form-field" type="text" name="username" placeholder='Username' />
                    <input className="form-field" type="email" name="email" placeholder='Email Address' />
                    <input className="form-field" type="password" name="password" placeholder='Password' />

                </div>
                <Link className="switch-text" to="/login"> Already have an account? <span style={{ 'color': 'blue' }}>Login</span> Instead</Link>

                <div className='login-form-footer'>
                    <button type='submit' className='login-button'>SIGN UP</button>
                </div>
            </form>
        </>
    );
}

export default Signup;