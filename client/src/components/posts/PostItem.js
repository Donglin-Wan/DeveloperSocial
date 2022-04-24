import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { addLike, removeLike, deletePost } from '../../actions/post'
import { useSelector, useDispatch } from 'react-redux'


const PostItem = (props) => {
  const dispatch = useDispatch()

  const {  _id: postId, text, name, avatar, user, likes, comments, date 
  } = props.post
  
  const { showActions = true } = props
  
  const { loading, user: { _id: userId } } = useSelector(state => state.auth)
  
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <>
            <button
              onClick={() => dispatch(addLike(postId))}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => dispatch(removeLike(postId))}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            <Link to={`/posts/${postId}`} className='btn btn-primary'>
              Comments{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!loading && user === userId && (
              <button
                onClick={() => dispatch(deletePost(postId))}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PostItem
