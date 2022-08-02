import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import styles from './Navbar.module.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  useEffect(() => {
    console.log(mobileMenuActive);
  }, [mobileMenuActive]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar border border-white pl-8 pr-5 md:pr-8 flex items-center justify-between bg-primary shadow-lg text-white tracking-wide text-2xl ">
        <Link className="font-bold" to={'campaigns'}>
          <FontAwesomeIcon icon={faDiceD20} />{' '}
          <span className="ml-2">Dungeon Tracker!</span>
        </Link>
        <ul className="hidden space-x-7 md:flex">
          {user ? (
            <li onClick={onLogout}>Logout</li>
          ) : (
            <>
              <li>
                <Link to={'register'}>Register</Link>
              </li>
              <li>
                <Link to={'/'}>Login</Link>
              </li>
            </>
          )}
        </ul>
        {/* Hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuActive((prevState)=>!prevState)}
            className={`${styles.hamburger} ${
              mobileMenuActive && styles.open
            } focus:outline-none`}>
            <span className={`${styles.hamburgerTop}`}></span>
            <span className={`${styles.hamburgerMiddle}`}></span>
            <span className={`${styles.hamburgerBottom}`}></span>
            <span></span>
          </button>
        </div>

        {/* Mobile menu */}
      </nav>
    </header>
  );
};

export default NavBar;
