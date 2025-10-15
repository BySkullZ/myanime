import React, { useEffect, useState } from "react";
import axios from "axios";

const AnimeInfo = (props) => {
	const [anime, setAnime] = useState([]);
	const [loading, setLoading] = useState(true);

    useEffect(() => {
		axios.get(`http://localhost:3001/anime/${props.anime}`).then(res => {setAnime(res.data[0]); setLoading(false)});
	}, [props.anime]);

	if (loading) {
		return
	}

  	return (
		<div className="anime-card">
			<div style={{width: "20vw"}}>
				<div className="me-3 mb-3">
					<img src={`http://localhost:3001/poster/${anime.poster_path}`} alt="..." className="rounded-4" style={{width: "20vw"}}/>
				</div>
				<p>{anime.name.toUpperCase()}</p>
				<p>STUDIO: {anime.studio}</p>
				<p>DATE DE DÉBUT: {anime.start_date}</p>
			</div>
		</div>
  	);
}

export default AnimeInfo;
