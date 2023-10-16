import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = () => {
        const data =  {username: username, password: password};
        console.log(data);
        axios.post("http://localhost:3001/auth/login",data).then(
            (res) => {
                console.log(res);
                //store accesstoken in session storage
                if(res.data.error) {
                    alert(res.data.error);
                } else {
                    sessionStorage.setItem("accessToken", res.data);
                    navigate("/");
                }
                
            }
        );
    };

  return (
    <div className="loginContainer">
        <input type="text" onChange={(event) => setUsername(event.target.value)}></input>
        <input type="password" onChange={(event) => setPassword(event.target.value)}></input>

        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login;