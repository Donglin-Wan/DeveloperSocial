import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile, deleteAccount } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  //extract profile, loading props from profile state managed in reducers/profile
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("effect code");
    //dispatch to actions/profile
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  /** 为什么不能外部引用jsx */
  // const hasProfile =
  //     <>
  //         <DashboardActions />
  //         {console.log(profile)}
  //         {/* {console.log(profile.experience)} */}
  //         <ExperienceList profileExperiences={ profile.experience }/>
  //     </>

  const noProfile = (
    <>
      <p>You have not yet setup a profile, please add one</p>
      <Link to='/create-profile' className='btn btn-primary my-1'>
        Create profile
      </Link>
    </>
  );

  const deleteHandler = () => {
    dispatch(deleteAccount())
  }

  if (loading && profile === null) {
    return <Spinner />;
  } else {
    return (
      <>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i>
          Welcome {user && user.name}
        </p>
        {profile !== null ? (
          // hasProfile
          <>
            <DashboardActions />
            <ExperienceList profileExperiences={profile.experience} />
            <EducationList profileEducations={profile.education} />
            <div className='my-2'>
              <button className='btn btn-danger' onClick={deleteHandler}>
                <i className='fas fa-user-minus'></i> Delete my account
              </button>
            </div>
          </>
        ) : (
          noProfile
        )}
      </>
    );
  }
};

export default Dashboard;
