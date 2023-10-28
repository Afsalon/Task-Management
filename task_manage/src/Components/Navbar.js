import { Link, useNavigate } from 'react-router-dom';
import './css/navbar.css';

const Navbar = () =>
{
    const nav = useNavigate()

    const logout = () =>
    {
        localStorage.removeItem('tokens')
        nav("/login")
    }
    return (
        <section id="dashboard-link" className="navbar">
            <div className="navbar-left">
                <Link to="/" className='navbar-logo'>Tasks</Link>
            </div>
            <div className="navbar-right">
                <p onClick={() => logout()} className="nr-t">Logout</p>
            </div>
        </section>
    );
}
export default Navbar;