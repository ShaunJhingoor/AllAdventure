import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./smallSearchBar.css";
import smallSearch from "../../images/smallSearch.png";
import { Link } from "react-router-dom";

function SmallSearchBar() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    if (searchValue.trim() !== '') {
      dispatch(fetchSearch(searchValue));
    } else {
      dispatch(clearSearchTrails());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="smallSearchBar">
      <input
        type="text"
        placeholder="Search by trail name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id="smallSearchBarInput"
        onKeyDown={handleKeyPress} // Handle Enter key press
      />
      <Link to="/trails/search" id="smallSearchBarButton">
        <img src={smallSearch} alt="search" onClick={handleSearch} />
      </Link>
    </div>
  );
}

export default SmallSearchBar;
