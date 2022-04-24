import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'

import PostForm from './PostForm'
import PostItem from './PostItem'

const Posts = () => {
    const { posts, loading } = useSelector(state => state.post)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community
          </p>
          <PostForm />
          <div className='posts'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Posts
