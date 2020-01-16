import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profileaction'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id);

    }, [getProfileById, match.params.id]);

    return (

        <div>

            {profile === null || loading ? <Spinner /> : (

                <div>
                    <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id
                        && <Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>}


                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />



                        <div class="profile-exp bg-white p-2">
                            <h2 class="text-primary">Experience</h2>

                            {profile.experience.length > 0 ?
                                (

                                    profile.experience.map((exp, index) => (
                                        < ProfileExperience key={exp._id} experience={exp} />
                                    ))

                                )

                                : (<h4>No previous Experiences </h4>)}
                        </div>

                        <div class="profile-edu bg-white p-2">
                            <h2 class="text-primary">Education</h2>

                            {profile.education.length > 0 ?
                                (

                                    profile.education.map((edu, index) => (
                                        <ProfileEducation key={edu._id} education={edu} />
                                    ))

                                )




                                : (<h4>No Degrees attained  </h4>)}
                        </div>

                        {profile.githubusername && (<ProfileGithub username={profile.githubusername} />)}






                    </div>

                </div>



            )}
        </div>



    )


}

const mapStateToProps = (state) => {
    return {
        profile: state.profilereducer,
        auth: state.authreducer
    }
}

export default connect(mapStateToProps, { getProfileById })(Profile);