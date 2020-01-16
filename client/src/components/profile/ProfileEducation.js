import React from 'react'

import Moment from 'react-moment'

const ProfileEducation = ({ education: { degree, school, fieldofstudy, to, from, description } }) => {

    return (
        <div>
            <h3 class="text-dark">{degree}</h3>
            <Moment format='YYYY/MM/DD'>{from}</Moment> --{!to ? ('Now') : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            <p><strong>School: </strong>{school}</p>
            <p><strong>field of study: </strong>{fieldofstudy}</p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>

    )

}

export default ProfileEducation;