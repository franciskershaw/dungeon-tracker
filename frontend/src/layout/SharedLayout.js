import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      <nav>
				this is a navbar, populate later
			</nav>
			<Outlet />
			<footer>Copywrite info</footer>
    </>
  );
};

export default SharedLayout;
