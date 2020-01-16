import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/postaction'
import { Link } from 'react-router-dom'
import PostItem from '../Posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'


const Post = ({ post: { post, loading }, getPost, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, []);

    return (
        (loading && post === null) ? <Spinner /> : (

            <div>
                <Link to="/posts" className="btn">Back To Posts</Link>
                <PostItem post={post} showActions={false} />
                < CommentForm postId={post._id} />
                <div className="comments">

                    {post.comments.map(comment =>
                        <CommentItem key={comment._id} postId={post._id} comment={comment} />
                    )}
                </div>

            </div>
        )

    )
}




const mapStateToProps = (state) => {
    return {
        post: state.postreducer
    }
}

export default connect(mapStateToProps, { getPost })(Post);
