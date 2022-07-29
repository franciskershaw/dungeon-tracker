import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header>
      <nav>
        <div>
          <span>logo</span>
          <span>DT</span>
        </div>
        <div>
          {user ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <>
              <Link to={'register'}>Register</Link>
              <Link to={'/'}>Login</Link>
            </>
          )}

          {/* To be completed later during development */}
          {/* <Link to={'about'}>About</Link>
					<Link to={'faqs'}>FAQs</Link> */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
