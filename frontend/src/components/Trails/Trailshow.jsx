import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Fetchtrail, selectTrail } from "../../store/trail";
import { useDispatch, useSelector } from "react-redux";
import './TrailShow.css';
import ReviewsIndex from "../Reviews/indexReviews";
import CreateReview from "../Reviews/createReview";
import AverageRating from "../Rating/averagerating";
import FancyAverageRating from "../Rating/fancyaveragerating";
import SmallSearchBar from "../search/smallsearchbar";
import camping from "../../images/camping.png";
import { useNavigate } from "react-router-dom";
import SmallTrailMapWrapper from "../maps/Smalltrailmap";
import Footer from "../footer/Footer";
import Cloud from "../../images/cloudy.png"
import Sunny from "../../images/sunny.png"
import Snow from "../../images/snow.png"
import Rain from "../../images/rain.png"
import Drizzle from "../../images/drizzle.png"
import Thunderstorm from "../../images/thunderstorm.png"
import Atmosphere from "../../images/atmosphere.png"
import SuggestedTrail from "./SuggestedTrails";

function TrailShow() {
    const { trailId } = useParams();
    const navigate = useNavigate();
    const [weeklyWeather, setWeeklyWeather] = useState([]);
    const dispatch = useDispatch();
    const trail = useSelector(selectTrail(trailId));
    const currentUser = useSelector(state=> state?.session.user)
    

    useEffect(() => {
        dispatch(Fetchtrail(trailId));
    }, [dispatch, trailId]);
    
    useEffect(() => {
        const fetchWeatherData = async (retryCount = 30) => {
            try {
                if (trail && trail.latitude !== undefined && trail.longitude !== undefined) {
                    const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
                    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${trail.latitude}&lon=${trail.longitude}&units=imperial&appid=${apiKey}`;
      
                    const response = await fetch(apiUrl)
                    if (!response?.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    const data = await response.json();
                    if (data && data?.daily) {
                        setWeeklyWeather(data?.daily);
                    } else {
                        throw new Error('Invalid weather data format');
                    }
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                if (retryCount > 0) {
                    // Retry after a delay
                    setTimeout(() => {
                        fetchWeatherData(retryCount - 1);
                    }, 1000); // Delay in milliseconds before retrying
                } else {
                    console.error("Retry limit exceeded. Could not fetch weather data.");
                }
            }
        };
         
        fetchWeatherData();
    }, [trail]);
  

    if (trail === null || !trail) {
        return (
            <div className="invalidTrail">
                <img src={camping} alt="camping" id="invalidTrailImg" />
                <h1 id="invalidTrailError">404</h1>
                <h1 id="invalidTrailHeader">We have reached the end of the trail</h1>
                <p id="invalidTrailStatment">The page you are looking for either does not exist or has a new link. Let us get you back on the right path.</p>
                <br />
                <button type="submit" onClick={() => navigate("/trails")} id='InvalidTrailButton'>Find Your Next Adventure</button>
            </div>
        );
    }

    return (
        <>
            <div id="showHeader">
                <SmallSearchBar />
            </div>
            <br />
            <div id="showWrapper">
                <div className="showoutside">
                    <form className="show">
                        <img src={trail?.photoUrl} alt="result" id="showtrailimag" />
                        <div id="breakerbarshow"></div>
                        <div id="showtextimag">
                            <p id="showtrailnameimag">{trail?.name}</p>
                            <span id="showtrailinfoimag">{trail?.difficulty} &bull;<span id="starshowimag">&#9733; </span><AverageRating trail={trail} /></span>
                        </div>
                        <br />
                        <div id="showdescriptionheader">
                            <p id="showdescriptionheadertext">Description</p>
                        </div>
                        <br />
                        <div id="breakerbarshow1"></div>
                        <br />
                        <div id="showdescription">
                            <p>{trail?.description}</p>
                        </div>
                        <br />
                        <div id="breakerbarshow1"></div>
                        <br />
                        <div id="modalAverage">
                            <div id="averageRating"><FancyAverageRating trail={trail} /> </div>
                            <div id="smallMap"><SmallTrailMapWrapper trail={trail} /></div>
                            <div id="reviewButton">
                                    {currentUser ? <CreateReview key={trail?.id} trail={trail} /> : <button onClick={() => {window.scrollTo(0, 0); navigate("/signup"); }} id="reviewSignUp"><p id="reviewSignUpContent">Sign Up to Write a Review</p></button>}
     
                            </div>
                        </div>
                        <br />
                        <div id="breakerbarshow1"></div>
                        <br />
                        <div id="weeklyWeather">
                        <p id="weatherHeader">Weather Forecast</p>
                        </div>
                        <br />
                        <div className="weatherCards">
                          {/* <div id="insideWeatherCards"> */}
                            {weeklyWeather.length > 0 && weeklyWeather.slice(0,5).map((day, index) => (
                                <div key={index} className="weatherCard">
                                  {day.weather[0].main === "Clear" && <img src={Sunny} alt="sun" />}
                                  {day.weather[0].main === "Clouds" && <img src={Cloud} alt="cloud" />}
                                  {day.weather[0].main === "Snow" && <img src={Snow} alt="cloud" />}
                                  {day.weather[0].main === "Rain" && <img src={Rain} alt="cloud" />}
                                  {day.weather[0].main === "Drizzle" && <img src={Drizzle} alt="cloud" />}
                                  {day.weather[0].main === "Thunderstorm" && <img src={Thunderstorm} alt="cloud" />}
                                  {day.weather[0].main === "Atmosphere" && <img src={Atmosphere} alt="cloud" />}
                                  {/* <img src={Cloud} alt="cloud" /> */}
                                    <p className="dayOfWeek">
                                        {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}
                                    </p>
                                    <p className="date">
                                        {new Date(day.dt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    </p>
                                    <span className="high">High: {Math.floor(day.temp.max)}&deg;F</span>
                                    <p className="low">Low: {Math.floor(day.temp.min)}&deg;F</p>
                                    <p className="weatherDescription">{day.weather[0].description}</p>
                                    </div>
                                
                            ))}
                            {/* </div> */}
                        </div>
                    
                        <br />
                        <br />
                        <div id="breakerbarshow1"></div>
                        <br />
                        <div id="suggestedTrailsHeader">
                            <p id="suggestedHeader">Suggested Trails</p>
                        </div>
                        <br />
                        <br />
                        <div id="suggestedTrail">
                            <SuggestedTrail current = {trailId}/>
                        </div>
                        <br />
                        <br />
                        <ReviewsIndex trail={trail} />
                        <br />
                    </form>
                </div>
                <br />
                <br />
            </div>
            <Footer />
        </>
    );
}

export default TrailShow;
