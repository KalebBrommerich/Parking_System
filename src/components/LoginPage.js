import { useNavigate } from 'react-router-dom';
import "../styles/LoginPage.css";


const LoginPage = () => {
    const navigate = useNavigate();

    const submitForm = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <div>
            <div className="container">
                <h2>Login</h2>
                <form action="Login" onSubmit={submitForm}>
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" required />
                    <label for="password">Password:</label>
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