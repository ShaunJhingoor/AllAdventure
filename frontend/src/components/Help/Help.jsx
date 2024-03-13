import "./Help.css"
import Footer from "../footer/Footer"
import SmallSearchBar from "../search/smallsearchbar"
import Logo from "../../images/adventureIcon.png"

function Help () {
    return(
    <>
    <SmallSearchBar/>
    <br />
    <div id="helpContainer">
        <img src={Logo} alt="logo" id="helpImg"/>
        <h1 id="helpHeader">Welcome To All Adventure</h1>
        <br />
        <br />
        <p id="Statement">  This interactive site allows users to make informed decisions about their next adventure based on reviews left by like-minded adventurers. To get started, you can log in, sign up, or use the demo user option. After completing one of these actions, you will be directed to an interactive map. </p>
        <br />
        <p id="Statement">  The collapsible sidebar on the left contains all the trails currently reviewed and available on our site. When you hover over a trail, it will zoom in on its location and you can get a feel for what the trail looks like. Clicking on a trail allows you to see more details and to view, create, edit, or delete reviews and ratings</p>
        <br />
        <p id="Statement">  At any time, you can click on the &quot;All Adventure&quot; logo to return to the home page. To access the maps again, simply click on &quot;Explore Nearby Trails&quot; or &quot;New York Favorites&quot; and you wll be taken back to the map. You can also search for a particular trail by name or search by difficulty of trails using the search bar.</p>
        <br />
        <p id="Statement1">  If you wish to leave the site, hover over the profile icon where you wll find a dropdown menu allowing you to log out.</p>
        <br />
        
    
    </div>
    <Footer/>
    </>
    )
    
}
export default Help