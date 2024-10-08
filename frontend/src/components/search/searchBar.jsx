import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./searchBar.css";
import search from "../../images/search.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.session?.user);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      dispatch(fetchSearch(searchValue));
    } else {
      dispatch(clearSearchTrails());
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      navigate("/trails/search");
      window.scrollTo(0, 0);
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
      return str[0].toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="searchBar">
        <div id="WelcomestatmentContainer">
          <div id="Welcomestatment">
            Welcome {currentUser ? "Back" : "Start"}{" "}
            {currentUser
              ? `${capitalizeFirstLetter(
                  currentUser?.fname
                )} ${capitalizeFirstLetter(currentUser?.lname)}`
              : "Your Search"}
          </div>

          <input
            type="text"
            placeholder="Search by trail name or difficulty"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ fontFamily: "monorope-m" }}
            id="searchBarInput"
            onKeyDown={handleSearchEnter}
          />

          <Link to="/trails/search" id="searchBarButton">
            <img
              src={search}
              alt="search"
              id="searchBarButtonImg"
              onClick={() => {
                handleSearch();
                window.scrollTo(0, 0);
              }}
            />
          </Link>

          <h1
            id="mapLink"
            onClick={() => {
              navigate("/trails");
              window.scrollTo(0, 0);
            }}
          >
            Explore nearby trails
          </h1>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
