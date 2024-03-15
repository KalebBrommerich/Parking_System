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
        console.log("1234");
        e.preventDefault();
        try {
            const username ="user1";
            const password = "password1";
            const response =  axios.post('http://localhost:5000/api/login', { username, password });
            //if fail, it will give error code 401. idk how to handle that for now
            console.log("adfas" + response);
            navigate('/');
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
            } else {
                console.error('An error occurred:', error.message);
            }
        }
    };

    return (
        <div>
            <div className="container">
                <h2>Login</h2>
                <form action="Login" onSubmit={submitForm}>
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" required />
                    <label fnpmor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                    <a href="forgotpassword.html" class="forgotpassword-link">Forgot Password?</a>
                    <hr/>
                    <a href="demo1.html" class="create-account">Create Account</a>
                    <hr/>
                    <button type="submit" background-color="blue">Login</button>
                </form>
            </div>
        </div>  
    );
};

export default LoginPage;