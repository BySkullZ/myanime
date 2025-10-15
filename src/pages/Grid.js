import { Link } from "react-router-dom";

const Grid = (props) => {
	if (props.animes.length === 0) {
		return (
			<div className="vh-100">
				<div>Aucun résultat trouvé.</div>
			</div>
		)
	}

	return (
		<div className="px-4 pt-3">
			<h2>{props.title && props.title.charAt(0).toUpperCase() + props.title.slice(1)}</h2>
			<div className="row">
				{props.animes.map((anime, index) => {
					return (
						<div className="col py-2">
							<Link to={`/anime/${(anime.name).toLowerCase().split(' ').join('-')}`}>
									<img src={`http://localhost:3001/poster/${anime.poster_path}`} alt="..." className="rounded-4" style={{width: "18em", height: "25em"}}/>
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default Grid;
