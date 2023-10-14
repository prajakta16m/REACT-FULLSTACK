
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';


function App() {

  return (
    <div className="App">
        <Router>
          <div className='navbar'>
            <Link to="/createpost">Create a Post</Link>
            <Link to="/">Home Page</Link>  
            <Link to="/registration">Registration</Link>
            <Link to="/login">Login</Link>
          </div>  
          
          <Routes>
            <Route path='/' exact Component={Home}></Route>
            <Route path='/post/:id' exact Component={Post}></Route>
            <Route path='/createpost' exact Component={CreatePost}></Route>
            <Route path='/registration' exact Component={Registration}></Route>
            <Route path='/login' exact Component={Login}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
