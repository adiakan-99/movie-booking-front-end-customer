import React from 'react'
import Axios from "axios"
import "./Signup.css"
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();

    const [signUpUsername, setSignUpUsername] = React.useState("")
    const [signUpEmail, setSignUpEmail] = React.useState("")
    const [signUpPassword, setSignUpPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [message, setMessage] = React.useState("")

    const handleUsername = (event) => {
        setSignUpUsername(event.target.value)
    }

    const handleEmail = (event) => {
        setSignUpEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setSignUpPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const sendSignUpDetails = (event) => {
        event.preventDefault();
        Axios.post("https://movie-booking-application-server.onrender.com/signup", {
            myUsername: signUpUsername,
            myEmail: signUpEmail,
            myPassword: signUpPassword,
            myConfirmPassowrd: confirmPassword
        })
            .then((output) => {
                if (output.data.message == "Sign Up succesfull!") {
                    navigate("/signin")
                } else {
                    setMessage(output.data.message)
                    navigate("/signup")
                }
            })
            .catch((error) => {
                setMessage(error)
            })
    }

    const goToSignIn = () => {
        navigate("/signin")
    }

    return (
        <div className="form-container">
            <h2 className="form-title">SIGN UP</h2>

            {message ? <h2>{message}</h2> : null}
            <form method='POST'>
                <div className="form-group mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name='username' id="username" className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter username" onChange={handleUsername} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name='email' id="email" className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter email" onChange={handleEmail} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name='password' id="password" className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter password" onChange={handlePassword} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" name='confirmpassword' id="password" className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter confirm password" onChange={handleConfirmPassword} />
                </div>
                <button type="submit" className="custom-button btn btn-primary w-full" onClick={sendSignUpDetails}>Sign Up</button>
                <div className="text-center mt-4">
                    <p>Already have an account?</p>
                    <button className="existing-user-button btn btn-secondary" onClick={goToSignIn}>Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;