import React, { useState } from 'react';
import "./Content.css";
import { useNavigate } from 'react-router-dom';

const Content = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            const user = storedUsers.find(
                (u) => u.username === username && u.password === password

            );
            if (user) {
                setMessage(`Login successfull ${username}`);
                navigate(`/${username}`)

            }
            else {
                setMessage(`Invalid Username or Password`)
            }

        }
        else {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = storedUsers.some((u) => u.username === username);
            if (userExists) {
                setMessage("Username already exists!");
            } else {
                storedUsers.push({ username, email, password });
                localStorage.setItem("users", JSON.stringify(storedUsers));
                setMessage("Signup successful! Please login.");
                setIsLogin(true);
                setUsername("");
                setEmail("");
                setPassword("");
            }
            navigate(`/${username}`)
        }



        console.log("Username:", username);
        console.log("Password:", password);
    }

    return (
        <div className="login-container">
            <h2>{isLogin ? "Login" : "SignUp"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>{isLogin ? "Login" : "SignUp"}</button>
                {message && <p>{message}</p>}

                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{""}
                    <button type='button' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "SignUp" : "Login"}</button>
                </p>

            </form>

        </div>
    )
}

export default Content;




