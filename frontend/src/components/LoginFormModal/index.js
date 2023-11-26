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
        <div id="loginmodal">
            <h1>Log In</h1>
            <div>
            <form id="loginform" onSubmit={handleSubmit}>
                <div>
                    <label>Username or Email<br></br>
                        <input
                            className="loginput"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            minLength={4}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password<br></br>
                        <input
                            className="loginput"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    </label>
                </div>
                <div>
                    {errors.credential && <p>{errors.credential}</p>}
                </div>
                {/* {!handleSubmit && <button id="cannotloginbutton">Log In</button>} */}
                {/* {console.log(credential.length)}
                {console.log(password.length)} */}
                {(credential.length<4 || password.length<6) &&
                <button disabled={true}>Log In</button>}
                {credential.length>=4 && password.length>=6 &&
                <button id="loginsubmitbutton" type="submit">Log In</button>}
                <button id="logindemobutton" onClick={logInDemo}>
                        <Link to="/" > Demo User</Link>
                </button>
            </form>
            </div>
        </div>
    );
};

export default LoginFormModal;
