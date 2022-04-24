import axios from "axios";
// import { Redirect, useHistory } from 'react-router-dom'
import { setAlert } from "./alert";

import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, CREATE_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_REPOS } from "./types";

import { logout } from "../actions/auth";

//GET current user profile => GET api/profile/me
export const getCurrentUserProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/me");

      //dispatch to reducers/profile
      dispatch({
        type: GET_PROFILE,
        //get profile data
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: CLEAR_PROFILE })
      
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//get all profiles
export const getAllProfiles = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
      const res = await axios.get("/api/profile");

      //dispatch to reducers/profile
      dispatch({
        type: GET_PROFILES,
        //get profile data
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//get profile by id
export const getProfileById= (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      //dispatch to reducers/profile
      dispatch({
        type: GET_PROFILE,
        //get profile data
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//get github repos
export const getGithubRepos= (username) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      //dispatch to reducers/profile
      dispatch({
        type: GET_REPOS,
        //get profile data
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//create OR update a profile
export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: CREATE_PROFILE,
        //profile data
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Profile Update" : "Profile Created", "success"));

      if (!edit) {
        //navigate to /dashboard, get go back
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//add experience => PUT /api/profile/experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      //profile data after experience added
      payload: res.data,
    });

    dispatch(setAlert("Experience added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status },
    });
  }
};

//add education=> PUT /api/profile/education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      //profile data after education added
      payload: res.data,
    });

    dispatch(setAlert("Education added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status },
    });
  }
};

//deleteExperience => api/profile/experience/:id
export const deleteExperience = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${expId}`);

    dispatch({
      type: UPDATE_PROFILE,
      //user profile
      payload: res.data,
    });

    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status },
    });
  }
};

//delete edu by id
export const deleteEducation = (eduId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${eduId}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (prompt("enter delete to confirm") === "delete") {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });

      dispatch(logout());

      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response, status: err.response.status },
      });
    }
  }
};
