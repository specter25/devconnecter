import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (

    <Route {...rest} render={props => !auth.isAuthenticated && !auth.loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
)

const mapStateToProps = state => {
    return { auth: state.authreducer }

}
export default connect(mapStateToProps)(PrivateRoute);