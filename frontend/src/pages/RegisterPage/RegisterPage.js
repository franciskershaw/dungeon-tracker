import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { userName, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/campaigns');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e)

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      const userData = {
        userName,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <h2>I am the registration page</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="userName"
          name="userName"
          value={userName}
          placeholder="Enter your name"
          onChange={onChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={onChange}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default RegisterPage;
