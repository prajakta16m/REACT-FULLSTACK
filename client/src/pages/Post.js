import React, { useContext } from 'react'
import { useEffect, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {

    let { id } = useParams();
    let navigate = useNavigate();

    const { authState } = useContext(AuthContext);
    

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
        axios.post(
            "http://localhost:3001/comments/", 
            {
                commentBody: newComment,
                PostId: id,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                  },
            },
           
             ).then((resp) => {

                if(resp.data.error) {
                    alert("error");
                }
                else {
                    const comm = { commentBody: newComment, username: resp.data.username};
                    setComments([...comments, comm]);

                    setNewComment('');
                }
            
            
        });
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
              },
        }).then((res) => {
            setComments(comments.filter((val) => {
                return val.id !== id;
            }))
        });
    }

    const deletePost = (id) => {
        alert(id);
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers : {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
           navigate("/");
        });
    }

  return (
    <div className='postPage'>
        <div className='leftSide'>
            <div id='individual' className='post'>
                <div className='title'>{postObj.title}</div>
                <div className='body'>{postObj.postText}</div> 
                <div className='footer'>{postObj.username}
                    { authState.username === postObj.username && <button onClick={() => {deletePost(postObj.id);}}>Delete Post</button>}
                </div> 
            </div>
            
        </div>
        <div className='rightSide'>
            <div className='addCommentContainer'>
                <input type='text' placeholder='Comment...' value={newComment} autoComplete='off'
                 onChange={(event) => {
                   
                    setNewComment(event.target.value);}} />
                <button onClick={addComment}>Add comment</button>
            </div>
            <div className='listOfComments'>
                {comments.map((comment, key) => {
                    return <div key={key} className='comment'>
                        {comment.commentBody}
                        <label>Username: {comment.username}</label>
                        {
                            authState.username === comment.username && 
                            <button onClick={ () => {deleteComment(comment.id)}}>X</button>
                        }
                        
                    </div>;
                })}
            </div>
        </div>
    </div>
  )
}

export default Post