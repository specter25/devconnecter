import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addExperience } from '../../../actions/profileaction'


const AddExperience = ({ addExperience, history }) => {


    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: '',
        description: '',
    });
    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        company,
        title,
        location,
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
        addExperience(formData, history);
    }

    return (
        <div>
            <section class="container">
                <h1 class="large text-primary">
                    Add An Experience
      </h1>
                <p class="lead">
                    <i class="fas fa-code-branch"></i> Add any developer/programming
                    positions that you have had in the past
      </p>
                <small>* = required field</small>
                <form class="form" onSubmit={e => handleSubmit(e)}>
                    <div class="form-group">
                        <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => handleChange(e)} required />
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="* Company" name="company" value={company} onChange={e => handleChange(e)} required />
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={e => handleChange(e)} />
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



export default connect(null, { addExperience })(withRouter(AddExperience))
