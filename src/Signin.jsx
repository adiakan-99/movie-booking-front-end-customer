import React from 'react';
import "./Signin.css";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from './Redux';
import { useDispatch } from 'react-redux';

function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const sendSignInDetails = (event) => {
        event.preventDefault(); 
        Axios.post("https://movie-booking-application-server.onrender.com/signin", {
            myEmail: email,
            myPassword: password
        })
        .then((output) => {
            if (output.data.message === "Sign In succesfull!") {
                dispatch(addUser({
                    username: output.data.username,
                    email: email
                }))
                navigate("/")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const goToSignUp = () => {
        navigate("/signup")
    }

    return (
        <div className="form-container">
            <h2 className="form-title">SIGN IN</h2>
            <form onSubmit={sendSignInDetails}>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name='email'
                        id="email"
                        className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter email"
                        onChange={handleEmail}
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name='password'
                        id="password"
                        className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter password"
                        onChange={handlePassword}
                    />
                </div>
                <button type="submit" className="custom-button btn btn-primary w-full">Sign In</button>

                <div className="text-center mt-4">
                    <p>New User?</p>
                    <button className="existing-user-button btn btn-secondary" onClick={goToSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signin;
