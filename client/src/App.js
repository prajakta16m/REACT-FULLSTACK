
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [ authState, setAuthState ] = useState({username: "", id: 0, status: false});


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);

    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: token,
        },
      }).then(res => {
        console.log("app.js res", res);
        if(res.data.error) {
          setAuthState({username: "", id: 0, status: false});
        } else {
          console.log("res.data", res.data);
          setAuthState({username: res.data.username, id: res.data.id, status: true});
        }
      
    });
  
  },[]);

  const logout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({username: "", id: 0, status: false});
     
  }

  return (
    
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            
            {
              !authState.status ? (
                <>
                <Link to="/registration">Registration</Link>
                <Link to="/login">Login</Link>
                </>
              ) : (
                
                <>
                <Link to="/createpost">Create a Post</Link>
                 <Link to="/">Home Page</Link> 
                  <button onClick={logout}>Logout</button>
                </>
              )
            } 

            <h1>{authState.username}</h1>
         </div>  
          
          <Routes>
            <Route path='/' exact Component={Home}></Route>
            <Route path='/post/:id' exact Component={Post}></Route>
            <Route path='/createpost' exact Component={CreatePost}></Route>
            <Route path='/registration' exact Component={Registration}></Route>
            <Route path='/login' exact Component={Login}></Route>
            <Route path='*' exact Component={PageNotFound}></Route>
          </Routes>
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
