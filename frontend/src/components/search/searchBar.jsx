import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./searchBar.css"
import search from "../../images/search.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function SearchBar(){
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector(state=> state?.session.user)

    const handleSearch = () => {
        if(searchValue.trim() !== ''){
            
            dispatch(fetchSearch(searchValue))
            
        }else{
            dispatch(clearSearchTrails())
        }
    }

    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch()
            navigate("/trails/search")
        }
      };

      const capitalizeFirstLetter = (str) =>  {
        if (str && str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
          } else {
            return "";
          }
      }

    return (
        <>
        <div className="searchBar">
        <h1 id="Welcomestatment">
        Welcome {currentUser ? 'Back' : 'Start'} {currentUser ? `${capitalizeFirstLetter(currentUser?.fname)} ${capitalizeFirstLetter(currentUser?.lname)}` : 'Your Search'} 
        
      </h1>
            
            <input 
            type="text"
            placeholder="Search by trail name" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="searchBarInput"
            onKeyDown={handleSearchEnter}
            />
           
            <Link to="/trails/search" id="searchBarButton"><img src={search} alt="search"   onClick={handleSearch} /></Link>
            
        </div>
        </>
    )
}

export default SearchBar