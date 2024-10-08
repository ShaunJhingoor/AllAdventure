import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./smallSearchBar.css";
import smallSearch from "../../images/smallSearch.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SmallSearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      dispatch(fetchSearch(searchValue));
      setSearchValue("");
    } else {
      dispatch(clearSearchTrails());
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      navigate("/trails/search");
      setSearchValue("");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="smallSearchBar">
      <input
        type="text"
        placeholder="Trail name or Difficulty"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ fontFamily: "monorope-m", color: "rgb(20,40,4)" }}
        id="smallSearchBarInput"
        onKeyDown={handleSearchEnter}
      />
      <Link to="/trails/search" id="smallSearchBarButton">
        <img
          src={smallSearch}
          alt="search"
          onClick={() => {
            handleSearch();
            window.scrollTo(0, 0);
          }}
          id="smallSearchBarButtonImag"
        />
      </Link>
    </div>
  );
}

export default SmallSearchBar;
