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
import Loadings from "../../images/loading.gif"
import NonFavorite from "../../images/whiteHeart.png";
import directions from "../../images/directions.png"
import redHeart from "../../images/redHeart.png"
import Email from "../../images/sendEmail.png"
import { fetchAllFavorites, removeFromFavorites, addToFavorites } from "../../store/favorite";
import { fetchTrailPhotos, trailPhotosArray } from "../../store/trail_photos";
import PhotoUploadModal from "../modals/photouploadmodal";
import { formatDate } from "../Reviews/formatedate";
function TrailShow() {
    const { trailId } = useParams();
    const navigate = useNavigate();
    const [weeklyWeather, setWeeklyWeather] = useState([]);
    const dispatch = useDispatch();
    const trail = useSelector(selectTrail(trailId));
    const currentUser = useSelector(state => state?.session?.user)
    const reviews = useSelector((state) => state?.trail?.[trail?.id]?.reviews || []);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [rerender, setRerender] = useState(false);
    const favorites = useSelector(state => state?.favorite);
    const [photoModalVisible, setPhotoModalVisible] = useState(false); 
    const [section, setSection] = useState('R')
    const photosArray = useSelector(trailPhotosArray)

    const capitalizeFirstLetter = (str) =>  {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
          } else {
            return ""
          }
      }

    useEffect(() => {
        dispatch(fetchTrailPhotos(trailId))
        .then(() => setLoading1(false))
            .catch(() => setLoading1(false))
    }, [dispatch,trailId])

    const handleSettingUploadPhoto = (e) => {
        e.preventDefault();
        setPhotoModalVisible(!photoModalVisible); 
    };

    const handleSendEmail = () => {
        const currentURL = window.location.href;
        const subject = "Check out this great coder!";
        const body = `Hey, I found this awesome project: ${currentURL}`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, "_blank");
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (trail && trail?.latitude !== undefined && trail?.longitude !== undefined) {
                    const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
                    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${trail?.latitude}&lon=${trail?.longitude}&units=imperial&appid=${apiKey}`;
      
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
                
            }
        };
         
        fetchWeatherData();
    }, [trail]);

    useEffect(() => {
        dispatch(Fetchtrail(trailId))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch, trailId]);

    const favoriteTrailIds = Object.values(favorites)?.map(favoriteObj => favoriteObj?.favorite?.trail?.id);

    useEffect(() => {
        if(currentUser){
        dispatch(fetchAllFavorites(currentUser?.id));
        }
    }, [currentUser, dispatch, favoriteTrailIds?.length, rerender]);

    const favoriteForTrail = Object.values(favorites)?.find(favoriteObj => favoriteObj?.favorite?.trail?.id == trail?.id);

    const isFavorite = favoriteTrailIds?.includes(trail?.id);

    const handleFavoriteClick = async() => {
        if (isFavorite) {
            await dispatch(removeFromFavorites(trail?.id, favoriteForTrail?.favorite?.id)); 
        } else {
            await dispatch(addToFavorites(trail?.id)); 
        }
        setRerender(!rerender); 
    };

    const handleGetDirections = (latitude, longitude) => {
        const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        window.open(mapsURL, "_blank");
    };

    if (loading || loading1) {
        return (
            <div className="loading">
                <img src={Loadings} alt="loading" />
                <h1>Loading</h1>
            </div>
        );
    }

    if (!trail) {
        return (
            <div className="invalidTrail">
                <img src={camping} alt="camping" id="invalidTrailImg" />
                <h1 id="invalidTrailError">404</h1>
                <h1 id="invalidTrailHeader">We have reached the end of the trail</h1>
                <p id="invalidTrailStatment">The page you are looking for either does not exist or has a new link. Let us get you back on the right path.</p>
                <br />
                <button type="submit"   onClick={() => { navigate("/trails"); window.scrollTo(0, 0); }}  id='InvalidTrailButton'>Find Your Next Adventure</button>
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
                        <div id="breakerbarshow">
                            <img src={directions} alt="directions" id="directionsTrailShow" onClick={() => handleGetDirections(trail?.latitude, trail?.longitude)} />
                            {currentUser && (
                                <div className="favorite-container-show" >
                                    {isFavorite ? (
                                        <img src={redHeart} alt="Favorite" className="favorite-icon-show" onClick={handleFavoriteClick} />

                                    ) : (
                                        <img src={NonFavorite} alt="Not Favorite" className="favorite-icon-show" onClick={handleFavoriteClick} />
                                    )}
                                </div>
                            )}
                            <img src={Email} alt="email" id="emailShow" onClick={handleSendEmail} />
                        </div>
                        <div id="showtextimag">
                            <p id="showtrailnameimag">{trail?.name}</p>
                            <span id="showtrailinfoimag">{trail?.difficulty} &bull;<span id="starshowimag">&#9733; </span><AverageRating trail={trail} />  ({Object.values(reviews)?.length})</span>
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
                                {currentUser ? <CreateReview key={trail?.id} trail={trail} /> : <button onClick={() => { window.scrollTo(0, 0); navigate("/signup"); }} id="reviewSignUp"><p id="reviewSignUpContent">Sign Up to Write a Review</p></button>}

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
                            {weeklyWeather.length > 0 && weeklyWeather.slice(0, 5).map((day, index) => (
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
                            <SuggestedTrail trailId={trailId}/>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div id="showHeaderContainer">
                            <p id="reviewsHeaderShow" className={section === 'R' ? 'active' : ''} onClick={() => setSection('R')}>Reviews ({Object.values(trail?.reviews)?.length})</p>  
                            <p id="photoHeaderShow" className={section === 'P' ? 'active' : ''} onClick={() => setSection('P')}>Photos ({photosArray
                                ?.filter(photo => photo?.trail_id == trailId)?.length})</p>
                        </div>
                        
                        
                        {section === 'R' ? (
                        <div>
                            <ReviewsIndex trail={trail} />
                         </div>
                        ): (
                            <>
                            <br />
                            <div id="breakerbarshow1"></div>
                            <br />
                            <div id="PhotoButton">
                                <div>
                                <p id="uploadPhotoHeader">Add Photos of this trail</p>
                                <p id="uploadPhotoContent1">Photos help others preview the trail. </p>
                                <p id="uploadPhotoContent"> Upload photos about this trail to inspire others</p>
                                </div>
                                {currentUser ? (
                                    <>
                                    <button onClick={handleSettingUploadPhoto} id="photoSignUp" > <p id="photoSignUpContent">Upload Photo</p></button>
                                    {photoModalVisible && <PhotoUploadModal trailId={trail?.id} setVisible={setPhotoModalVisible} visible={photoModalVisible} />}
                                    </>
                                ) : (
                                    <button onClick={() => { window.scrollTo(0, 0); navigate("/signup"); }} id="photoSignUp">
                                    <p id="photoSignUpContent">Sign Up to Upload a Photo</p>
                                    </button>
                                )}
                            </div>
                            <div className="photoGrid">
                                
                            {photosArray
                                ?.map((photo, index) => (
                                    <>
                                    <div>
                                    <div key={`${photo?.id}_${index}`}id="showPhotoContainer">
                                        <div id="showPhotoText">
                                            <p id="clickToViewProfile">Click to view profile</p>
                                            <p id="uploadedBy">Uploaded by:{capitalizeFirstLetter(photo?.user_fname)} {capitalizeFirstLetter(photo?.user_lname)} </p>
                                            <p id="dateUploaded">Date Uploaded:{formatDate(photo?.created_at)}</p>
                                        </div>
                                    <img src={photo?.image_url} alt={`Photo ${index}`} className="photoItem" onClick={() => { window.scrollTo(0, 0);navigate(`/profile/${photo?.user_id}`)}}/>
                                    </div>
                                    </div>
                                    </>
                                ))?.reverse()}
                        </div>
                        </>
                        )}
                        
                        
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



