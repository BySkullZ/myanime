import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/myanime.png";
import * as Icon from 'react-bootstrap-icons';

const Banner = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [navigateDropdown, setNavigateDropdown] = useState(false);
    const [user, setUser] = useState([]);

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearch(search);
            navigate(`/search/${search.split(' ').join('-')}`);
        }
    }

    function toggleNavigate() {
        setNavigateDropdown(!navigateDropdown);
    }

    useEffect(() => {
        async function getData() {
            if (localStorage.getItem("userId")) {
                const res = await axios.get(`http://localhost:3001/user/${localStorage.getItem("userId")}`);
                setUser(res.data[0]);
            }
        }
        getData();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-color sticky-top w-100">
            <div className="container-fluid">
                <Link to="/">
                    <img src={logo} style={{height: "1.5em"}} alt="MyAnime"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active text-light text-decoration-none navbar-hover">
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <p className="nav-link dropdown-toggle text-light navbar-hover" type="button" onClick={toggleNavigate} data-bs-toggle="dropdown">Naviguer</p>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link navbar-hover">Disabled</p>
                        </li>
                    </ul>
                    {user.length === 0 && 
                        <Link to="/login" className="nav-link active text-light text-decoration-none navbar-hover me-3">
                            Se connecter
                        </Link>
                    }
                    <Link to="/login" className="nav-link active text-light text-decoration-none navbar-hover me-3">
                        {user && user.username !== "" && user.username}
                        {user && user.rank_id === 1 && <Icon.MoonStarsFill size={16} className="mx-2 mb-1"/>}
                        {user && user.rank_id === 2 && <Icon.MoonStars size={16} className="mx-2 mb-1"/>}
                        {user && user.rank_id === 3 && <Icon.MoonFill size={16} className="mx-2 mb-1"/>}
                        {user && user.rank_id === 4 && <Icon.Moon size={16} className="mx-2 mb-1"/>}
                    </Link>
                    <form className="d-flex" role="search" onKeyDown={handleSubmit}>
                        <input onChange={handleChange} className="search" type="search" placeholder="Rechercher"/>
                        <Link to={`/search/${search.split(' ').join('-')}`}>
                            <Icon.Search color="white" size={30} className="me-3 ms-2 my-1"/>
                        </Link>
                    </form>
                </div>
            </div>
            <ul className={`dropdown-menu navigate ${navigateDropdown === true && "show"}`}>
                <li><p className="dropdown-item">Action</p></li>
                <li><p className="dropdown-item">Another action</p></li>
                <li><hr className="dropdown-divider"/></li>
                <li><p className="dropdown-item">Something else here</p></li>
            </ul>
        </nav>
    )
}

export default Banner;