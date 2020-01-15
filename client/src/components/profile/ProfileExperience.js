import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const ProfileExperience = ({ experience: { company, title, location, to, from, description } }) => {

    return (
        <div>
            <h3 class="text-dark">{company}</h3>
            <Moment format='YYYY/MM/DD'>{from}</Moment> --{!to ? ('Now') : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            <p><strong>Position: </strong>{title}</p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>

    )

}

export default ProfileExperience;