import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

const SignupFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email, username, firstName, lastName, password, }))
                    .then(closeModal)
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }).then(history.push("/"));
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    let disabled = true;
    if(email.length > 0 && firstName.length > 0 && lastName.length > 0
        && confirmPassword.length > 0 && username.length >=4 && password.length >= 6){
            disabled = false;
    }

    return (
        <div id="signupmodal">
            <h1>Sign Up</h1>
            <form id="signupform" onSubmit={handleSubmit}>
                <label> Email <br></br>
                    <input
                        className="signupinput"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label> Username <br></br>
                    <input
                        className="signupinput"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
                <label> First Name <br></br>
                    <input
                        className="signupinput"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p>{errors.firstName}</p>}
                <label> Last Name <br></br>
                    <input
                        className="signupinput"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p>{errors.lastName}</p>}
                <label> Password <br></br>
                    <input
                        className="signupinput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label> Confirm Password <br></br>
                    <input
                        className="signupinput"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                {disabled && <button id="disabledsignup">
                    Sign Up
                </button>}
                {!disabled && <button id="regularsignup" type="submit">
                    Sign Up
                </button>}
            </form>
        </div>
    );
};

export default SignupFormModal;
