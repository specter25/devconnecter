import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/postaction'

import PostItem from './PostItem'
import PostForm from './PostForm'


const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts();

    }, [getPosts]);


    return (
        <div>
            {loading ? <Spinner /> : (


                <div>
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

                    <PostForm />

                    <div classNameName="posts">
                        {posts.map(post => {
                            return (
                                <PostItem key={post._id} post={post} showActions={true} />
                            )
                        })}

                    </div>
                </div>

            )}
        </div>
    )
}



const mapStateToProps = state => {
    return {
        post: state.postreducer
    }

}

export default connect(mapStateToProps, { getPosts })(Posts);