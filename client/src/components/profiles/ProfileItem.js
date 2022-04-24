import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = (props) => {
    const {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    } = props.profile

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
              <p className='my-1'>{location && <span>{location}</span>}</p>
              {_id ? <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link> : <p>user disappeared</p>}
        
      </div>
      <ul>
        {skills.slice().map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileItem
