import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addEducation } from "../../actions/profile";

const AddEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const dispatch = useDispatch();

  const history = useHistory();

  //if current checkbox is checked, then 'to' input field should be disabled
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldOfStudy, from, to, current, description } = formData;

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
    dispatch(addEducation(formData, history));
  };

  return (
    <>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={formSubmitHandler}>
        <div className='form-group'>
          <input type='text' placeholder='* School or Bootcamp' name='school' value={school} onChange={onChangeHandler} required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Degree or Certificate' name='degree' value={degree} onChange={onChangeHandler} required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Field Of Study' name='fieldOfStudy' value={fieldOfStudy} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input type='date' name='from' value={from} onChange={onChangeHandler} />
        </div>
        <div className='form-group'>
          <p>
            <input type='checkbox' name='current' value={current} checked={current} onChange={checkCurrentHandler} /> Current School or Bootcamp
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' value={to} onChange={onChangeHandler} disabled={toDateDisabled ? "disabled" : ""} />
        </div>
        <div className='form-group'>
          <textarea name='description' cols='30' rows='5' placeholder='Program Description' value={description} onChange={onChangeHandler}></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' value='submit'/>
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddEducation
