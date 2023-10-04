import React from 'react'
import { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {

    let { id } = useParams();

    const [ postObj, setPostObj ] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((resp) => {
            console.log(resp.data);
            setPostObj(resp.data);
        });
    });

  return (
    <div className='postPage'>
        <div className='leftSide'>
            <div id='individual' className='post'>
                <div className='title'>{postObj.title}</div>
                <div className='body'>{postObj.postText}</div> 
                <div className='footer'>{postObj.username}</div> 
            </div>
            
        </div>
        <div className='rightSide'>Comments Section</div>
    </div>
  )
}

export default Post