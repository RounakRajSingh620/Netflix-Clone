import React, { useState } from 'react';
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.config";
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    // State to manage the visibility of the password field
    const [showPassword, setShowPassword] = useState(false);

    // State to manage form input values
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    // Function to handle form submission
    const handleSignIn = async () => {
        try {
            const { email, password } = formValue;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (err) {
            console.log(err);
        }
    };

    // Function to toggle the visibility of the password field
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/");
    })

    return (
        // Pass the showpassword prop to the Container styled component
        <Container showpassword={showPassword ? 'true' : 'false'}>
            {/* Background image component */}
            <BackgroundImage />
            <div className="content">
                {/* Header component */}
                <Header login />
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Unlimited movies, TV shows and more</h1>
                        <h4>Watch anywhere. Cancel anytime</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <div className="form">
                        {/* Email input field */}
                        <input type="email" placeholder="Email Address" name="email" value={formValue.email} onChange={(e) => setFormValue({ ...formValue, [e.target.name]: e.target.value })} />

                        {/* Conditional rendering of password field based on showpassword state */}
                        {showPassword && (
                            <input type="password" placeholder="Password" name="password" value={formValue.password} onChange={(e) => setFormValue({ ...formValue, [e.target.name]: e.target.value })} />
                        )}

                        {/* Button to toggle password visibility */}
                        <button onClick={toggleShowPassword}>{showPassword ? "Hide Password" : "Show Password"}</button>
                    </div>

                    {/* Button to submit form */}
                    <button onClick={handleSignIn}>Sign Up</button>
                </div>
            </div>
        </Container>
    );
}

// Styled component for the container
const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh 85vh;
        .body {
            gap: 1rem;
            text-align: center;
            font-size: 2rem;
            h1 {
                padding: 0 25rem;
            }
        }
        .form {
            display: flex;
            justify-content: center;
            width: 60%;
            height: 6%;
            input {
                color: black;
                border: none;
                padding: 1.5rem;
                font-size: 1.2rem;
                border: 1px solid black;
                &:focus {
                    outline: none;
                }
            }
            button {
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                font-weight: bolder;
                font-size: 1.05rem;
            }
        }
        button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
        }
    }
    
    /* Additional styling for the form when showpassword is true */
    ${({ showpassword }) => showpassword === 'true' && `
        .form {
            grid-template-columns: 1fr 1fr;
        }
    `}
`;
