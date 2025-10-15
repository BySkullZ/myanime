import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import Grid from './Grid';
import Footer from './Footer';

const Genre = () => {
	let { genre } = useParams();
	const [animes, setAnimes] = useState([]);

    useEffect(() => {
		async function getData() {
			const res = await axios.get(`http://localhost:3001/genres/${genre}`);
			setAnimes(res.data);
		}
		
		getData();
	}, [genre]);

	return (
		<div>
			<Navbar/>
			<Grid title={`${genre} (${animes.length})`} animes={animes}/>
			<Footer/>
		</div>
	);
}

export default Genre;
