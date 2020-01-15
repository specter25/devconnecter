import React, { useState } from 'react';
// import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'
import { register } from '../../actions/authaction'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('passwords not match', 'danger', 5000);
        }
        else {
            console.log(formData);
            register({ name, email, password })

            //this is the code to register via axios not redux thus not needed
            // const newUser = { name: name, email: email, password: password }
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // } catch (error) {
            //     console.log(error.response)
            // }

        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }



    return (

        <div>


            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} required onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" onChange={(e) => handleChange(e)} value={email} name="email" required />
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            minLength="6"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password2}
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>


        </div>

    )



}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authreducer.isAuthenticated
    }
}

export default connect(mapStateToProps, { setAlert, register })(Register);
