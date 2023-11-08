import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';

function Home() {

    const [ list, setList ] = useState([]);
    const [ likedPosts, setLikedPosts ] = useState([]);

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

  useEffect(() => {

    if(!authState.status) {
      navigate("/login");
    } else {
      // make the get request
      axios.get("http://localhost:3001/posts",
      {
        headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
      },
      ).then((resp) => {
        setList(resp.data.listOfPosts);
        setLikedPosts(resp.data.likedPosts.map(like => {return like.PostId;}));
      });
    }
   
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

    if(likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => {
        return id !== postId;
      }))
    } else {
      setLikedPosts(...likedPosts, postId);
    }
  }

  return (
    <div>
        {list.map((post, key)=>{    
          return <div className='post' >
            <div className='title'>{post.title}</div>
            <div className='body' onClick={() => navigate(`/post/${post.id}`)}>{post.postText}</div>
            <div className='footer'>{post.username}
             
            <ThumbUpIcon onClick={() => {likePost(post.id)}}
              className={ likedPosts.includes(post.id) ? 'unlikeBttn' : 'likeBttn' }
            ></ThumbUpIcon>
              <label>{post.Likes.length}</label>
            </div>
          </div>
        })}
    </div>
  )
}

export default Home