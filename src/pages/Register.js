import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/myanime.png";

const Register = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [state, setState] = useState({username: "", email: "",password: ""});

    async function logIn() {
        const res = await axios.post(`http://localhost:3001/register/`, {username: state["username"], email: state["email"], password: state["password"]});
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
                <h1 style={{paddingTop: "10%"}}>Inscription</h1>
                <input onChange={handleChange} type="text" className="search w-25 mx-auto mt-5" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name="username"></input>
                <br/>
                <input onChange={handleChange} type="email" className="search w-25 mx-auto mt-3" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" name="email"></input>
                <br/>
                <input onChange={handleChange} type="password" className="search w-25 mx-auto mt-3" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" name="password"></input>
                <br/>
                <button onClick={logIn} className="login-button w-25 mx-auto mt-3" type="submit">Inscription</button>
                {error && <div className="w-25 mx-auto mt-4 alert alert-danger" role="alert">{error}</div>}
            </div>
        </div>
    )
}

export default Register;