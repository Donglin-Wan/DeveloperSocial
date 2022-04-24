import React, { useState } from "react";
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from "../../actions/alert"
import { register } from "../../actions/auth"
// To run typechecking on the props for a component
import PropTypes from 'prop-types';
// import axios from 'axios'

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData
  
  const onChangeHandler = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    // console.log(`${event.target.name}:${event.target.value}`)
  }

  const onSubmitHandler = async event => {
    event.preventDefault()
    if (password !== password2) {
      // console.log('password no match')

      //pass to actions/alert.js
      props.setAlert('Passwords do not match', 'danger', 3000)
    } else {
      // console.log('register success')

      //pass to actions/auth
      props.register({name, email, password})

      /** request  will handle by redux*/
      // console.log(formData)
      // const newUser = {
      //   name,
      //   email,
      //   password
      // }

      // try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };

      //   const body = JSON.stringify(newUser);

      //   //POST => register user => http://localhost:5000/api/users
      //   const res = await axios.post('/api/users', body, config);
      //   // console.log(res.data) //user token

      // } catch (err) {
      //   console.error(err.response.data)
      // }
    }
  }

  if (props.isAuthenticated) {
    return <Redirect to='/dashboard'/>
  }

  return (
    // <section className='container'>
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit = {onSubmitHandler}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' value={name} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChangeHandler} />
          <small className='form-text'>This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' name='password' value={password} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Confirm Password' name='password2' value={password2} onChange={onChangeHandler} />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account?
        <Link to='/login'>Sign In</Link>
      </p>
     {/* </section> */}
    </>
  );
};


Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// connect(stateMap, {actions want to use})
//setAlert action defined in actions/alert.js
export default connect(mapStateToProps, {setAlert, register})(Register);
