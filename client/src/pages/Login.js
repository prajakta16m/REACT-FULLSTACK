import React, { useState} from 'react';
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.post("http://localhost:3001/auth/login", {username: username, password: password}).then(
            (res) => {
                console.log(res);
            }
        );
    };

  return (
    <div>
        <input type="text" onChange={(event) => setUsername(event.target.value)}></input>
        <input type="password" onChange={(event) => setPassword(event.target.value)}></input>

        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login;