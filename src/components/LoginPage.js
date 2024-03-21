import axios from "axios";
import "../styles/LoginPage.css";
//import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
    const navigate = useNavigate();

    // const submitForm = (event) => {
    //     event.preventDefault();
    //     navigate('/');
    // };
    

    const  submitForm =  (e) => {
        e.preventDefault();
        try {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log(username+ " "+ password)
            //Don't know how to not use localhost, will need to change this eventually
            const response =  axios.post('http://localhost:5000/api/login', { username, password });
            //if login bad, it will give error code 401. idk how to handle that for now
            console.log("Response: " + response.status);

            if(response )
            navigate('/');
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
            } else  if (error.response.status === 401) {
                console.error('bad password', error.response.config.url);
            }
            else {
                console.error('An error occurred:', error.message);
            }
        }
    };

    return (
        <div>
            <div className="container">
                <h2>Login</h2>
                <form action="Login" onSubmit={submitForm}>
                    <label htmlFor="email">StarID:</label>
                    <input type="text" id="username" name="starid" required />
                    <label fnpmor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                    <a href="forgotpassword.html" className="forgotpassword-link">Forgot Password?</a>
                    <hr/>

                    <hr/>
                    <button type="submit" background-color="blue">Login</button>
                </form>
            </div>
        </div>  
    );
};

export default LoginPage;