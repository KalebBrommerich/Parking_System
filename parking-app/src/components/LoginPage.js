import axios from "axios";
import "../styles/LoginPage.css";
//import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";



const LoginPage = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    // const submitForm = (event) => {
    //     event.preventDefault();
    //     navigate('/');
    // };
    

    const  submitForm = async (e) => {
        e.preventDefault();
        try {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            //console.log(username+ " "+ password)
            //Don't know how to not use 199.17.162.16, will need to change this eventually
            const response = await axios.post('http://199.17.162.16:5000/api/login', { username, password });
            //if login bad, it will give error code 401. idk how to handle that for now
            const token = response.data.token;

            if(response)
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('username', username);
                navigate('/');
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
                setLoginError("Error, unable to find server");
            } else  if (error.response.status === 401) {
                console.error('bad password', error.response.config.url);
                setLoginError("Invalid username or password");
            }
            else {
                console.error('An error occurred:', error.message);
                setLoginError("An unexpected error occured, try again later");
            }
        }
    };

    return (
        <div id="form-container"> 
            <div className="navbar"/>
            <div className="left-image"/>
            <div className="container">
                <h2>Login</h2>
                <form action="Login" onSubmit={submitForm}>
                <label htmlFor="email">StarID:</label>
                    <input type="text" id="username" name="starid" required />
                    <label fnpmor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                    <p className="errorMessage" style={{display: (loginError !== "") ? 'block' : 'none'}}>{loginError}</p>
                    <hr/>
                    <button type="submit" background-color="blue">Login</button>
                </form>
            </div>
        </div>  
    );
};

export default LoginPage;