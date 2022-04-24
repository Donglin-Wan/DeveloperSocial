import React from 'react'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'
import { deleteExperience } from "../../actions/profile"

const ExperienceList = ({ profileExperiences }) => {
    const dispatch = useDispatch()

    const experiences = profileExperiences.map(exp => {
        return (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>
                    {moment.utc(exp.from)}
                </Moment>
                - {exp.to === null ? " Now" :
                    <Moment format='YYYY/MM/DD'>
                        {moment.utc(exp.to)}
                    </Moment>}
            </td>
            <td>
              <button onClick={() => dispatch(deleteExperience(exp._id))} className='btn btn-danger'>
                Delete
              </button>
            </td>
          </tr>
        );
    })
  return (
    <>
      <h2 className='my-2'>Experience</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
}

export default ExperienceList
