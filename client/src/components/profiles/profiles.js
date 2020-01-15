import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profileaction'
import ProfileItem from './profileItem'


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles])
    return (
        <div>
            {loading ? <Spinner /> :
                <div>
                    <h1 class="large text-primary">Developers</h1>
                    <p class="lead">
                        <i class="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (


                            profiles.map(profile => {
                                return (
                                    <ProfileItem key={profile._id} profile={profile} />
                                )
                            })


                        ) : (<h4>No profiles found yet</h4>)}

                    </div>

                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.profilereducer
    }
}



export default connect(mapStateToProps, { getProfiles })(Profiles);
