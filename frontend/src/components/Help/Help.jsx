import "./Help.css";
import Footer from "../footer/Footer";
import SmallSearchBar from "../search/smallsearchbar";
import Logo from "../../images/adventureIcon.png";

function Help() {
  return (
    <>
      <SmallSearchBar />
      <br />
      <div id="helpContainer">
        <img src={Logo} alt="logo" id="helpImg" />
        <h1 id="helpHeader">welcome to All Adventure</h1>
        <br />
        <br />
        <p id="Statement">
          {" "}
          This interactive site allows users to make informed decisions about
          their next adventure based on reviews and photos left by like-minded
          adventurers. To get started, you can log in, sign up, or use the demo
          user option. After completing one of these actions, you will be
          directed to an interactive map.{" "}
        </p>
        <br />
        {window.innerWidth <= 600 ? (
          <p id="Statement">
            The top part of the screen contains all currently available trails.
            You can favorite a trail by clicking on the little heart located
            under the trail photo. Clicking on a pin on the map will scoll the
            top part of the page to the trail that you clicked on, and give you
            information about the trail.
          </p>
        ) : (
          <p id="Statement">
            {" "}
            The collapsible sidebar on the left contains all currently available
            trails. You can favorite a trail by clicking on the little heart
            located under the trail photo. When you hover over a trail, it will
            zoom in on its location and you can get a feel for what the trail
            looks like. Clicking on a pin will scroll to the trail in the
            sidebar, and give you information about the trail.{" "}
          </p>
        )}

        <br />
        <p id="Statement">
          Clicking on a trail also allows you to see more details, and view,
          create, edit, or delete reviews and ratings. You can also upload
          pictures for that specific trail and see pictures other users have
          uploaded. If you click on a photo or a users review you will be
          directed to their profile, if you are logged in. You can favorite this
          trail, get directions to this trail, and share this trail via email.
        </p>
        <br />
        {window.innerWidth <= 600 ? (
          <p id="Statement">
            {" "}
            At any time, you can click on the &quot;All Adventure&quot; logo to
            return to the home page. To access the map again, simply click on
            &quot;Explore Nearby Trails&quot; or &quot;New York Favorites&quot;
            or when logged in click on the profile icon and click on
            &quot;Map&quot;, you will be taken back to the map. You can also
            search for a particular trail by name or filter by difficulty using
            the search bars.{" "}
          </p>
        ) : (
          <p id="Statement">
            {" "}
            At any time, you can click on the &quot;All Adventure&quot; logo to
            return to the home page. To access the map again, simply click on
            &quot;Explore Nearby Trails&quot; or &quot;New York Favorites&quot;
            or when logged in hover over the profile icon and click on
            &quot;Map&quot;, you will be taken back to the map. You can also
            search for a particular trail by name or filter by difficulty using
            the search bars.{" "}
          </p>
        )}

        <br />
        {window.innerWidth <= 600 ? (
          <p id="Statement">
            {" "}
            When logged in, clicking on the profile icon opens a drop down. The
            drop down contains profile, map, and logout options. If you click
            &quot;Profile&quot; you will be directed to your profile where you
            can see your favorites, reviews, and photos.{" "}
          </p>
        ) : (
          <p id="Statement">
            {" "}
            When logged in, hovering over the profile icon opens a drop down.
            The drop down contains profile, map, and logout options. If you
            click &quot;Profile&quot; you will be directed to your profile where
            you can see your favorites, reviews, and photos.{" "}
          </p>
        )}

        <br />
        {window.innerWidth <= 600 ? (
          <p id="Statement1">
            {" "}
            If you wish to leave the site, click on the profile icon where you
            will find a dropdown menu allowing you to log out.
          </p>
        ) : (
          <p id="Statement1">
            {" "}
            If you wish to leave the site, hover over the profile icon where you
            will find a dropdown menu allowing you to log out.
          </p>
        )}

        <br />
      </div>
      <Footer />
    </>
  );
}
export default Help;
