import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types'
import axios from 'axios'
import { setAlert } from './alert'

//get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios('/api/posts');
        dispatch({ type: GET_POSTS, payload: res.data })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}
//add likes
export const addLike = (id) => async dispatch => {// this is the postid
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//removeLike

export const removeLike = (id) => async dispatch => {// this is the postid
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//delete Post
export const deletePost = (id) => async dispatch => {// this is the postid
    try {
        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({ type: DELETE_POST, payload: id })
        dispatch(setAlert('post removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//add Post


export const addPost = (formData) => async dispatch => {// this is the postid
    try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const res = await axios.post(`/api/posts`, formData, config);
        dispatch({ type: ADD_POST, payload: res.data })
        dispatch(setAlert('post added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//get post

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios(`/api/posts/${id}`);
        dispatch({ type: GET_POST, payload: res.data })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

//add comment

export const addComment = (postId, formData) => async dispatch => {// this is the postid
    try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({ type: ADD_COMMENT, payload: res.data })
        dispatch(setAlert('comment added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//remove comment
export const removeComment = (postId, commentId) => async dispatch => {// this is the postid
    try {

        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({ type: REMOVE_COMMENT, payload: commentId })
        dispatch(setAlert('comment removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}