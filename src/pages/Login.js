import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/myanime.png";

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [state, setState] = useState({username: "", password: ""});

    async function logIn() {
        const res = await axios.post(`http://localhost:3001/users/`, {username: state["username"], password: state["password"]});
        if (res.data.length > 0) {
            localStorage.setItem("userId", res.data[0].id)
            setLoggedIn(true);
            console.log(res.data[0].id);
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect.")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setLoggedIn(true);
        }
    }, [loggedIn])

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function logOut() {
        localStorage.removeItem("userId");
        setLoggedIn(false);
    }

    if (loggedIn) {
        return (
            <div className="login-container text-light">
                <div className="d-flex flex-row justify-content-between">
                    <div className="" style={{width: "50%", height: "20vh"}}>
                        <Link to="/">
                            <img src={logo} style={{height: "30%"}} alt="MyAnime" className="mt-3 ms-4"/>
                        </Link>
                    </div>
                    <div className="d-flex text-end text-light mt-4 me-5 fw-light">
                        <button style={{borderStyle: "none", background: "none", height: "20%"}} className="fs-5 mx-5 navbar-hover fw-light text-light">Changer de compte</button>
                        <button style={{borderStyle: "none", background: "none", height: "20%"}} onClick={logOut} className="fs-5 mx-5 navbar-hover fw-light text-light">Déconnexion</button>
                    </div>
                </div>
                <div>
                    <h1 className="text-center fw-semibold py-5">QUI EST-CE ?</h1>
                </div>
                <br/>
                <br/>
                <div className="d-flex align-items-center">
                    <div className="me-2 ms-auto fw-bold">
                        <button className="login-select-button">&lt;</button>
                    </div>
                    <div className="login-select d-flex justify-content-around w-50" style={{margin: 0}}>
                        <div className="login-select-profile ms-2">
                            <p></p>
                        </div>
                        <Link to="/">
                            <div className="login-select-profile-selected align-self-center translate-middle start-50 position-absolute" style={{top: "56%"}}>
                                <h2 className="d-flex justify-content-center h-100 align-items-center" style={{fontSize: "100px", marginBottom: 0}}>K</h2>
                            </div>
                        </Link>
                        <div className="login-select-profile me-2">
                            
                        </div>
                    </div>
                    <div className="ms-2 me-auto fw-bold">
                        <button className="login-select-button">&gt;</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="login-container text-light">
            <div className="d-flex flex-row justify-content-between">
                <div className="" style={{width: "50%", height: "20vh"}}>
                    <Link to="/">
                        <img src={logo} style={{height: "30%"}} alt="MyAnime" className="mt-3 ms-4"/>
                    </Link>
                </div>
                <div className="d-flex text-end text-light mt-4 me-5 fw-light">
                    <div className="px-5">
                        <Link to="/" style={{margin: 0}} className="text-decoration-none navbar-hover text-light">
                            <p className="fs-5">Retour</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h1 style={{paddingTop: "10%"}}>Connexion</h1>
                <input onChange={handleChange} type="text" className="search w-25 mx-auto mt-5" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name="username"></input>
                <br/>
                <input onChange={handleChange} type="password" className="search w-25 mx-auto mt-3" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" name="password"></input>
                <br/>
                <button onClick={logIn} className="login-button w-25 mx-auto mt-3" type="submit">Connexion</button>
                {error && <div className="w-25 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
            </div>
        </div>
    )
}

export default Login;