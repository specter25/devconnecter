import React from 'react';

import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileaction'

const Experience = ({ experience, deleteExperience }) => {

    const experiences = experience.map(exp => {

        return (
            < tr key={exp._id} >
                <td>{exp.company}</td>
                <td class="hide-sm">{exp.title}</td>
                <td class="hide-sm">{exp.location}</td>
                <td class="hide-sm">
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                </td>
                <td class="hide-sm"> {exp.to === null ? ('Now') : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}</td>
                <td>
                    <button class="btn btn-danger" onClick={(e) => deleteExperience(exp._id)}>
                        Delete
              </button>
                </td>
            </tr >
        )



    })


    return (
        <div>
            <h2 class="my-2">Experience Credentials</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th class="hide-sm">Title</th>
                        <th class="hide-sm">Location</th>
                        <th class="hide-sm">From</th>
                        <th class="hide-sm">To</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}

                </tbody>
            </table>
        </div>

    )
}
export default connect(null, { deleteExperience })(Experience);