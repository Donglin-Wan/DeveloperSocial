import React from 'react'
import Moment from 'react-moment'
import moment from 'moment'

const ProfileEducation = (props) => {
    const { school, degree, fieldOfStudy, current, to, from, description} = props.education
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> - {!to ? " Now" : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
}

export default ProfileEducation
