import { useDispatch, useSelector } from "react-redux"
import { Fetchtrails } from "../../store/trail"
import { useEffect } from "react"
import TrailsIndexItem from "./TrailsIndexItem"
import { trailsArray } from "../../store/trail"
import "./TrailsIndex.css"
import { Link } from "react-router-dom"
import home from "../../images/home.jpeg"
import SearchBar from '../search/searchBar';
import { useState } from "react"
import Footer from "../footer/Footer"
// import { Carousel, Row, Col } from "react-bootstrap";

function TrailsIndex(){
    const trails = useSelector(trailsArray)
    const [center, setCenter] = useState({lat:  40.79142619411136, lng:-73.58735483173312})
    const [zoom, setZoom] = useState(10)
    
        zoom 
        center
    
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(Fetchtrails())
       
    }, [dispatch]);



    return(
        <>
        
        <img src={home} alt="home" id="homepageimag" />
        <SearchBar/>
        <div id='indexWrapper'>
            <br />
            <Link to='/trails' id="linkTrailIndexHeader" onClick={() => window.scrollTo(0, 0)}>
            <h1 id="TrailIndexHeader">New York Favorites</h1>
        </Link>
            <br />
        <div id="trailindexwrapper">
        {/* <Carousel indicators={false}>
                        {[...Array(Math.ceil(trails.length / 4))].map((_, index) => (
                            <Carousel.Item key={`carousel_${index}`} className="d-flex">
                                <Col>
                                    {trails.slice(index * 4, index * 4 + 4).map((trail, idx) => (
                                        <Row key={idx} md={3}>
                                            <TrailsIndexItem trail={trail} setCenter={setCenter} setZoom={setZoom} />
                                        </Row>
                                    ))}
                                </Col>
                            </Carousel.Item>
                        ))}
                    </Carousel> */}

            {trails.slice(0,4).map((trail,index) => 
                <TrailsIndexItem key={`${trail?.id}_${index}`} trail={trail} setCenter={setCenter} setZoom={setZoom}/>)}
            {/* <Link to='/trails' id="showIndexBoxLink">
                <div id='showIndexBox'>
                <h1 id="showIndexBoxContent">
                    <span id='showIndexBoxContent1'>Show More</span>
                    <span id="showIndexBoxContent2">{">"}</span>
                </h1>
                {/* <h1 id="showIndexBoxContent2">{">"}</h1> */}
                
            {/* </div>
            </Link> */} 
        </div>
            
        </div>
        <Footer/>
      </>
    )
}
export default TrailsIndex