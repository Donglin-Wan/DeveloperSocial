import React from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { deleteEducation } from "../../actions/profile";

const EducationList = ({ profileEducations}) => {
  const dispatch = useDispatch();

  const educations = profileEducations.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className='hide-sm'>{edu.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{moment.utc(edu.from)}</Moment>- {edu.to === null ? " Now" : <Moment format='YYYY/MM/DD'>{moment.utc(edu.to)}</Moment>}
        </td>
        <td>
          <button onClick={() => dispatch(deleteEducation(edu._id))} className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h2 className='my-2'>Education</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default EducationList;
