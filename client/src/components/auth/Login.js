import React, { useState } from 'react';
import { login } from '../../actions/authaction'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password, } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        login({ email, password });
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
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }



    return (

        <div>


            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Login to your account</p>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>

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

                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign up</Link>
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

export default connect(mapStateToProps, { login })(Login);
