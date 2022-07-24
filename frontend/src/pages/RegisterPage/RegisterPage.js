import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    console.log(formData)
  },[formData])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

	const onSubmit = (e) => {
		e.preventDefault()

		console.log('submitting')
    console.log(e)

	}

  return (
    <>
      <h2>I am the registration page</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email address</label>
        <input onChange={onChange} type="email" placeholder='Email address' id='email' name='email' required/>
        <label htmlFor="userName">Name</label>
        <input onChange={onChange} type="text" placeholder='Name' id='userName' name='userName' required/>
        <label htmlFor="password">Password</label>
        <input onChange={onChange} type="password" id='password' name='password' placeholder='password' required/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input onChange={onChange} type="confirmPassword" id='confirmPassword' name='confirmPassword' placeholder='confirmPassword' required/>
        <button>Submit</button>
      </form>
    </>
  );
};

export default RegisterPage;
