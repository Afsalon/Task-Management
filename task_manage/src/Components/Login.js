import { Link, useNavigate } from 'react-router-dom';
import './css/login.css';
import './css/loader.css';
import { login } from '../Services/login';
import { useCallback, useContext, useEffect } from 'react';
import { ContextApi } from '../App';
import { actions } from '../Store/actions';
const Login = () =>
{
    const nav = useNavigate();
    const { state, dispatch } = useContext(ContextApi)

    const on_login_submit = useCallback((e) =>
    {
        e.preventDefault();
        dispatch({ type: actions.set_login_loader })
        login(e.target.username.value,
            e.target.password.value).then(response =>
            {
                if (response.status === 200)
                {
                    dispatch({ type: actions.login, payload: response.data })
                    nav('/')
                }
                else
                {
                    dispatch({ type: actions.unset_login_loader })
                }
            })
    }, [dispatch, nav])


    useEffect(() =>
    {
        if (localStorage.getItem('tokens'))
        {
            nav('/')
        }
    }, [nav])


    return (
        <>
            <form onSubmit={(e) => on_login_submit(e)}>
                <section className="login-form">
                    <div className='login-form-header'>
                        Task <sub>[Manager]</sub>
                    </div>
                    {state.login_loader ?
                        <span className="loader"></span> :
                        <>
                            <div className='login-form-body'>
                                <input className="form-field" type="text" name="username" placeholder='Username' />
                                <input className="form-field" type="password" name="password" placeholder='Password' />
                            </div>
                            <Link className="switch-text" to="/signup"> Don't have an account? <span style={{ 'color': 'blue' }}>Sign-up</span> now</Link>
                            {state.login_error ? <>
                                <p className='error-text'>Invalid Credentials</p>
                            </> : <></>}
                            <div className='login-form-footer'>
                                <button type='submit' className='login-button'>LOGIN</button>
                            </div>
                        </>
                    }
                </section>
            </form>
        </>

    );
}

export default Login;