import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import { getPostById } from '../../actions/post'


const Post = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const {post, loading} = useSelector(state => state.post)
    

    useEffect(() => {
        dispatch(getPostById(id))
    }, [dispatch])
    
  return (
    <>
      {loading || post === null ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Link to='/posts' className='btn'>
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Post
