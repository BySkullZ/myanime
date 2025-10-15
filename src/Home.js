import './Home.css';
import Navbar from './pages/Navbar';
import Banner from './pages/Banner';
import Row from './pages/Row';
import Footer from './pages/Footer';

function Home() {
	return (
		<div className="">
			<Navbar/>
			<Banner/>
			<Row title="Nouveautés"/>
			<Footer/>
		</div>
	);
}

export default Home;
