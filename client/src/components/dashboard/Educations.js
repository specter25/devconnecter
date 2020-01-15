import React from 'react';

import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileaction'
const Educations = ({ education, deleteEducation }) => {

    const educations = education.map(edu => {

        return (
            < tr key={edu._id} >
                <td>{edu.degree}</td>
                <td class="hide-sm">{edu.school}</td>
                <td class="hide-sm">{edu.fieldofstudy}</td>
                <td class="hide-sm">
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
                </td>
                <td class="hide-sm">{edu.to === null ? ('Now') : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}</td>
                <td>
                    <button class="btn btn-danger" onClick={(e) => deleteEducation(edu._id)}>
                        Delete
              </button>
                </td>
            </tr >
        )



    })


    return (
        <div>
            <h2 class="my-2">Education Credentials</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Degree</th>
                        <th class="hide-sm">School</th>
                        <th class="hide-sm">Field of Study</th>
                        <th class="hide-sm">From</th>
                        <th class="hide-sm">To</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {educations}

                </tbody>
            </table>
        </div>

    )
}
export default connect(null, { deleteEducation })(Educations);