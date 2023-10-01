
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    // make the get request
    axios.get("http://localhost:3001/posts").then((resp) => {
      console.log(resp);
    });
  }, []);
  
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
