import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import AnimeInfo from './AnimeInfo';
import Row from './Row';
import Footer from './Footer';

const Anime = () => {
	let { query } = useParams();
	const [anime, setAnime] = useState([]);
	const [episodeSelected, setEpisodeSelected] = useState(0);
	const [loading, setLoading] = useState(true);

    useEffect(() => {
		axios.get(`http://localhost:3001/anime/${query.split('-').join(' ')}`).then(res => {setAnime(res.data[0]); setLoading(false)});
		setEpisodeSelected(0);
	}, [query]);

	if (loading) {
		return
	}

  	return (
    	<div>
			<Navbar/>
			<div className="anime-backdrop" style={{background: `url(http://localhost:3001/backdrop/${anime.backdrop_path})`}}>
				<div className="backdrop-gradient">
					<div className="mx-5 py-5 text-white row">
						<div className="col">
							<AnimeInfo anime={anime.name.toUpperCase()}/>
						</div>
						<div className="col align-items-end text-end pt-3">
							<h2 className="fw-bold">{anime.name.toUpperCase()}</h2>
							<p className="text-shadow" style={{fontSize: "18px"}}>{anime.description}</p>
							<div className="text-end d-flex justify-content-end">
								<p style={{color: "#FF9950"}} className="text-shadow">Genre(s):&nbsp;</p>
								{anime.genre.split(',').map((genre, index) => {
									return (
										<a style={{color: "#FF9950"}} className="text-decoration-none text-shadow" href={`/genre/${genre.replace(/\s/g,'').toLowerCase()}`}>{genre}{index+1 !== anime.genre.split(',').length && ","}&nbsp;</a>
									)
								})}
							</div>
							<div className="text-end fs-5">
								<button className="mb-4 season-button">Saison 1</button>
							</div>
							<div className="d-flex">
								<div className="pe-5" style={{top: 0}}>
									<p>{anime.urls[episodeSelected].name}</p>
									<iframe title={anime.urls[episodeSelected].name} src={`https://voe.sx/e/${JSON.parse(anime.urls)[episodeSelected].url}`} allowFullScreen={true} width={700} height={430} style={{"border-radius": "20px"}}></iframe>
								</div>
								<div className="d-flex flex-column pt-3" style={{overflow: "hidden", height: "450px"}}>
									<div className="myanime-row-scroll" style={{"overflow-y": "auto", "overflow-x": "hidden"}}>
										{JSON.parse(anime.urls).map((url, index) => {
											return (
												// <div key={url.name}>
												// 	<p>{url.name}</p>
												// 	<iframe title={url.name} src={`https://voe.sx/e/${url.url}`} allowFullScreen={true} width={700} height={430}></iframe>
												// </div>
												<div className="pb-3 me-3">
													<button onClick={() => setEpisodeSelected(index)} className={`episode-button fs-5 fw-bold ${episodeSelected === index && "episode-button-selected"}`}>Episode {index+1}</button>
												</div>
											)
										})}	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Row title="Voir aussi"/>
			<Footer/>
    	</div>
  	);
}

export default Anime;
