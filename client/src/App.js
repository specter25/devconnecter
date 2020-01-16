import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import CreateProfile from './components/layout/profile-forms/create-profile'
import Profiles from './components/profiles/profiles'
import Posts from './components/Posts/Posts'
import Post from './components/Post/Post'
import Profile from './components/profile/Profile'
import AddExperience from './components/layout/profile-forms/AddExperience'
import AddEducation from './components/layout/profile-forms/AddEducation'
import EditProfile from './components/layout/profile-forms/EditProfile'
import Alert from './components/layout/Alert'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import setAuthToken from './util/setAuthToken'
import { loadUser } from './actions/authaction'
import store from './store'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoutes'

if (localStorage.token) {
  // console.log(localStorage.token);
  setAuthToken(localStorage.token)
}

function App() {
  // similar component did mount 
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
            <Route exact path='/profiles' component={Profiles} />
            <PrivateRoute exact path='/posts' component={Posts} />
            <PrivateRoute exact path='/posts/:id' component={Post} />
            <Route exact path='/profile/:id' component={Profile} />
          </Switch>
        </section>
      </div>
    </Router>

  );
}

export default App;
