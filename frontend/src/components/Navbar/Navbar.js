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
      <nav className="flex items-center justify-between bg-primary p-3 pr-4 shadow-md font-Roboto text-white text-lg">
        <Link className='pl-8' to={'campaigns'}>Dungeon Tracker</Link>
        <ul className="flex space-x-7 pr-8">
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

          {/* To be completed later during development */}
          {/* <Link to={'about'}>About</Link>
					<Link to={'faqs'}>FAQs</Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
