import React, { useEffect } from 'react';
// import axios from 'axios'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileaction'
import { deleteAccount } from '../../actions/profileaction'
import DashboardActions from './Dashboardaction'
import Experience from './Experience'
import Educations from './Educations'



const Dashboard = ({ auth: { user }, profile: { loading, profile }, getCurrentProfile, deleteAccount }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])


    return loading && profile === null ? <Spinner /> : (
        <div>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>

            {profile != null ? (
                <div>
                    < DashboardActions />
                    < Experience experience={profile.experience} />
                    <Educations education={profile.education} />

                    <div>
                        <button class="btn btn-danger" onClick={(e) => deleteAccount()}>
                            <i className="fas fa-user-minus"></i>
                            Delete Account
              </button>
                    </div>

                </div>
            ) : (
                    <div>
                        <p>You have not yet created a profile</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                    </div>
                )}




        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.authreducer,
        profile: state.profilereducer
    }
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);