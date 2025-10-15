import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import Grid from './Grid';
import Footer from './Footer';

const Search = () => {
	let { query } = useParams();
	if (query !== undefined) {
		query = query.split('-').join(' ');
	} else {
		query = ""
	}
	const [animes, setAnimes] = useState([]);

    useEffect(() => {
		async function getData() {
			const res = await axios.get(`http://localhost:3001/animes/${query}`);
			setAnimes(res.data);
		}
		getData();
	}, [query]);

	return (
		<div>
			<Navbar/>
			<Grid animes={animes}/>
			<Footer/>
		</div>
	);
}

export default Search;
