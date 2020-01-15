import { combineReducers } from 'redux';
import alert from './alert'
import authreducer from './authreducer'
import profilereducer from './profilereducer'
export default combineReducers({
    alert,
    authreducer,
    profilereducer
});