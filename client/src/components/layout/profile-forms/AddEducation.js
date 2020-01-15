import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addEducation } from '../../../actions/profileaction'


const AddEducation = ({ addEducation, history }) => {


    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: '',
        description: '',
    });
    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addEducation(formData, history);
    }

    return (
        <div>
            <section class="container">
                <h1 class="large text-primary">
                    Add  Education
      </h1>
                <p class="lead">
                    <i class="fas fa-code-branch"></i> Add your Previous Study Background      </p>
                <small>* = required field</small>
                <form class="form" onSubmit={e => handleSubmit(e)}>
                    <div class="form-group">
                        <input type="text" placeholder="* degree" name="degree" value={degree} onChange={e => handleChange(e)} required />
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="* school" name="school" value={school} onChange={e => handleChange(e)} required />
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange={e => handleChange(e)} />
                    </div>
                    <div class="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={e => handleChange(e)} />
                    </div>
                    <div class="form-group">
                        <p><input type="checkbox"
                            name="current" value=""
                            checked={current}

                            onChange={e => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }} />
                            Current Job</p>
                    </div>
                    <div class="form-group">
                        <h4>To Date</h4>
                        <input type="date" name="to" value={to} onChange={e => handleChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                    </div>
                    <div class="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                            value={description} onChange={e => handleChange(e)}
                        ></textarea>
                    </div>
                    <input type="submit" class="btn btn-primary my-1" />
                    <Link class="btn btn-light my-1" href="dashboard.html">Go Back</Link>
                </form>
            </section>
        </div>
    )
}



export default connect(null, { addEducation })(withRouter(AddEducation))
