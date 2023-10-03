
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';


function App() {

  return (
    <div className="App">
        <Router>
          <Link to="/createpost">Create a Post</Link>
          <Link to="/">Home Page</Link>  
          <Routes>
            <Route path='/' exact Component={Home}></Route>
            <Route path='/createpost' exact Component={CreatePost}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
