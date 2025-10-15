import banner from "../images/banner.png";
import bannervideo from "../images/banner.mp4";

const Banner = () => {
    return (
        <div>
            <div className="position-absolute opacity-100 banner-video">
                <video src={bannervideo} autoPlay={true} muted loop style={{maxWidth: "100%"}}/>
            </div>
            <div className="text-center banner" style={{zIndex: 1}}>
                <img src={banner} alt="MyAnime" className="mw-100 position-relative"/>
            </div>
        </div>
    )
}

export default Banner;