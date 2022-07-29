import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate('campaigns');
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <h2>I am the login page</h2>

      <form onSubmit={onSubmit}>
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
        <button>Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
