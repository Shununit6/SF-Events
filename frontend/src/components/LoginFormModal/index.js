import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from 'react-router-dom';
import "./LoginForm.css";

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        return await dispatch(sessionActions.login( { credential, password} ))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        }
    const logInDemo = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        closeModal();
        // logout();
        // Hello, Demo-lition demo@user.io
        const credential = "demo@user.io";
        const password ="password"
        return await dispatch(sessionActions.login( { credential, password} ))
            // return dispatch(sessionActions.login( { demoUser, demoUserPass} ));
        };
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        minLength={4}
                        required
                    />
                </label>
                <label>
                    Password<br></br>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                </label>
                {errors.credential && <p>{errors.credential}</p>}
                <button type="submit">
                    Log In
                </button>
                <div>
                <button onClick={logInDemo}>
                    <Link to="/" > Demo User</Link>
                </button>
                </div>
            </form>
        </div>
    );
};

export default LoginFormModal;
