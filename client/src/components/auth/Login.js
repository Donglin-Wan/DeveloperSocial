import React, { useState } from "react";
import { Link, Redirect} from 'react-router-dom'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../actions/auth'

const Login = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {  email, password } = formData;

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // console.log(`${event.target.name}:${event.target.value}`)
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("login success");

    // console.log(email, password)
    //fire login action in actions/auth.js
    // login(email, password)
    dispatch(login(email, password))
  };

  //redirect if logged in 
  if (isAuthenticated) {
    return <Redirect to='/dashboard'></Redirect>
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>
      <form className='form' onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' name='email' required value={email} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' name='password' value={password} onChange={onChangeHandler} />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account
        <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  );
};

export default Login
