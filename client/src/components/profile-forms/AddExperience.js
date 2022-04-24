import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addExperience } from "../../actions/profile";

const AddExperience = () => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const dispatch = useDispatch();

  const history = useHistory();

  //if current checkbox is checked, then 'to' input field should be disabled
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const checkCurrentHandler = (e) => {
    setFormData({
      ...formData,
      current: !current,
    });
    toggleDisabled(!toDateDisabled);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };

  return (
    <>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={formSubmitHandler}>
        <div className='form-group'>
          <input type='text' placeholder='* Job Title' name='title'  value={title} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Company' name='company'  value={company} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Location' name='location' value={location} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input type='date' name='from' value={from} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <p>
            <input type='checkbox' name='current' checked={current} value={current} onChange={checkCurrentHandler} /> {"  "}Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' value={to} onChange={onChangeHandler} disabled={toDateDisabled ? "disabled" : ""} />
        </div>
        <div className='form-group'>
          <textarea name='description' cols='30' rows='5' placeholder='Job Description' value={description} onChange={onChangeHandler}></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' value='submit' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddExperience;
