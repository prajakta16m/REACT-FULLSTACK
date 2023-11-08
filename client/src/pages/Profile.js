import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {

    let { id } = useParams();

    let navigate = useNavigate();

    const [user, setUser ] = useState("");
    const [list, setPosts] = useState([]);

    useEffect(() => {
            axios.get(`http://localhost:3001/auth/user/${id}`).then((res) => {
                console.log(res.data);
                setUser(res.data.username);
            });
            axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((res) => {
                console.log("---",res);
                setPosts(res.data.listOfPosts);
               
            });
    }, []);

  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1>Username :  {user} </h1>
        </div>
        <div className='listOfPosts'>
        <div>
            {list.map((post, key)=>{    
            return <div className='post' >
                <div className='title'>{post.title}</div>
                <div className='body' onClick={() => navigate(`/post/${post.id}`)}>{post.postText}</div>
                <div className='footer'>{post.username}
               
                </div>
            </div>
            })}
    </div>
        </div>
    </div>
  )
}

export default Profile