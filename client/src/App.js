
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState } from 'react';

function App() {

  const [ authState, setAuthState ] = useState(false);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to="/createpost">Create a Post</Link>
            <Link to="/">Home Page</Link> 
            {
              !authState && (
                <>
                <Link to="/registration">Registration</Link>
                <Link to="/login">Login</Link>
                </>
              )
            } 
            
          </div>  
          
          <Routes>
            <Route path='/' exact Component={Home}></Route>
            <Route path='/post/:id' exact Component={Post}></Route>
            <Route path='/createpost' exact Component={CreatePost}></Route>
            <Route path='/registration' exact Component={Registration}></Route>
            <Route path='/login' exact Component={Login}></Route>
          </Routes>
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
