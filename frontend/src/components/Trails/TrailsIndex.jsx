import { useDispatch, useSelector } from "react-redux";
import { FetchRange } from "../../store/trail";
import { useEffect, useState } from "react";
import TrailsIndexItem from "./TrailsIndexItem";
import { trailsArray } from "../../store/trail";
import "./TrailsIndex.css";
import { Link } from "react-router-dom";
import home from "../../images/home.jpeg";
import SearchBar from '../search/searchBar';
import Footer from "../footer/Footer";
import right from "../../images/rightArrow.png"
import left from "../../images/leftArrow.png"
function TrailsIndex() {
    const trails = useSelector(trailsArray);
    const [center, setCenter] = useState({lat: 40.81501535327977, lng: -73.39608034896676});
    const [zoom, setZoom] = useState(10);
    const [loadingTrail, setLoadingTrail] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const trailsPerPage = 4;

    zoom
    center

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchRange(1, 7)) 
        .then(() => {
            setLoadingTrail(false);
        });
    }, [dispatch]);

    const handleRightClick = () => {
        if (startIndex + 2 < trails?.length) {
            setStartIndex(startIndex + 2);
        }
    };

    const handleLeftClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 2);
        }
    };
    
    return (
        <>
            <img src={home} alt="home" id="homepageimag" />
            <SearchBar />
            <div id='indexWrapper'>
                <br />
                <Link to='/trails' id="linkTrailIndexHeader" onClick={() => window.scrollTo(0, 0)}>
                    <h1 id="TrailIndexHeader">New York Favorites</h1>
                </Link>
                <br />
                <div id="trailindexwrapper" >
                    {loadingTrail ? (
                        <div id="suggestedTrailsLoading1">
                            <div className="loader2"></div>
                        </div>
                    ) : (
                        <div className="carousel-buttons">
                                {startIndex > 0 && (
                                    <button className="left-button" onClick={handleLeftClick}><img src={left} alt="left" id="rightarrowimg"/></button>
                                )}
                            {trails.slice(startIndex, startIndex + trailsPerPage).map((trail, index) => (
                                <TrailsIndexItem key={`${trail?.id}_${index}`} trail={trail} setCenter={setCenter} setZoom={setZoom} />
                            ))}
                                {startIndex + trailsPerPage < trails.length && (
                                    <button className="right-button" onClick={handleRightClick}><img src={right} alt="right" id="rightarrowimg"/></button>
                                )}
                            </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TrailsIndex;

