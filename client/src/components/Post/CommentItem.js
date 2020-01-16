import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeComment } from '../../actions/postaction'
import Moment from 'react-moment'


const CommentItem = ({ postId, auth, comment: { _id, text, name, avatar, user, date }, removeComment }) => (

    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">
                {text}
            </p>
            <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>

            {!auth.loading && user === auth.user._id && (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                        console.log(postId, _id);
                        removeComment(postId, _id)
                    }}
                >
                    <i className="fas fa-times"></i>
                </button>
            )}

        </div>
    </div>


)



const mapStateToProps = (state) => {
    return {
        auth: state.authreducer
    }
}

export default connect(mapStateToProps, { removeComment })(CommentItem);