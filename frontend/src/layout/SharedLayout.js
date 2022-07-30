import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SharedLayout = () => {
  return (
    <>
      <Navbar />
			<Outlet />
			{/* <Footer /> */}
      <ToastContainer />
    </>
  );
};

export default SharedLayout;
