import React from 'react'
import { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {

    let { id } = useParams();

    const [ postObj, setPostObj ] = useState({});
    const [ comments, setComments ] = useState([]);
    const [ newComment, setNewComment ] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((resp) => {
           
            setPostObj(resp.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((resp) => {
           
           setComments(resp.data);
        });
    }, []);

    const addComment = () => {
        axios.post(`http://localhost:3001/comments/`, {commentBody: newComment, PostId: id}).then((resp) => {
            console.log('comment added');
            const comm = { commentBody: newComment};
            setComments([...comments, comm]);

            setNewComment('');
        });
    };

  return (
    <div className='postPage'>
        <div className='leftSide'>
            <div id='individual' className='post'>
                <div className='title'>{postObj.title}</div>
                <div className='body'>{postObj.postText}</div> 
                <div className='footer'>{postObj.username}</div> 
            </div>
            
        </div>
        <div className='rightSide'>
            <div className='addCommentContainer'>
                <input type='text' placeholder='Comment...' value={newComment} autoComplete='off'
                 onChange={(event) => {
                    console.log(event.target.value);
                    setNewComment(event.target.value);}} />
                <button onClick={addComment}>Add comment</button>
            </div>
            <div className='listOfComments'>
                {comments.map((comment, key) => {
                    return <div className='comment'>
                        {comment.commentBody}
                    </div>;
                })}
            </div>
        </div>
    </div>
  )
}

export default Post