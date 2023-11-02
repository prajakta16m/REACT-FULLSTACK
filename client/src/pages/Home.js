import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [ list, setList ] = useState([]);

    let navigate = useNavigate();

  useEffect(() => {
    // make the get request
    axios.get("http://localhost:3001/posts").then((resp) => {
      setList(resp.data);
    });
  }, []);

  const likePost = (postId) => {
    axios.post("http://localhost:3001/like", { PostId: postId}, 
    {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((data) => {
      setList(list.map(post => {
        if(post.id === postId){
          if(data.liked) {
            return{
              ...post, Likes: [...post.Likes, 0]
            };
          }else{
            const likeArray = post.Likes;
            likeArray.pop();
            return{
              ...post, Likes: likeArray
            };
          }
            
        }else {
          return post;
        }
      }));
    });
  }

  return (
    <div>
        {list.map((post, key)=>{    
          return <div className='post' >
            <div className='title'>{post.title}</div>
            <div className='body' onClick={() => navigate(`/post/${post.id}`)}>{post.postText}</div>
            <div className='footer'>{post.username}
              <button onClick={() => {likePost(post.id)}}>Like</button>
              <label>{post.Likes.length}</label>
            </div>
          </div>
        })}
    </div>
  )
}

export default Home