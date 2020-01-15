import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

//a function that that a state and action
const initialState = [
    //this will conatin these properties but initially it will be empty
    // {
    //     id:1,
    //     msg:'Please Log in',
    //     alertType:'success'
    // }
]

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];

        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}