import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Row = (props) => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
		axios.get(`http://localhost:3001/animes/`).then(res => {setAnimes(res.data); setLoading(false)});
	}, []);

	if (loading) {
		return
	}

    return (
        <div className="py-3 px-3 myanime-row">
            <h2>{props.title}</h2>
            <div className="d-flex myanime-row-scroll">
                {animes.map((anime, index) => {
                    return (
                        <Link key={index} to={`/anime/${(anime.name).toLowerCase().split(' ').join('-')}`} className="me-3 mb-3">
                            <img src={`http://localhost:3001/poster/${anime.poster_path}`} alt="..." className="rounded-4" style={{width: "18em", height: "25em"}}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Row;