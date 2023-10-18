import React, { useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {setAuthState} = useContext(AuthContext);

    const login = () => {
        const data =  {username: username, password: password};
        
        axios.post("http://localhost:3001/auth/login",data).then(
            (res) => {
                console.log(res);
                //store accesstoken in session storage
                if(res.data.error) {
                    alert(res.data.error);
                } else {
                    localStorage.setItem("accessToken", res.data);
                    setAuthState(true);
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