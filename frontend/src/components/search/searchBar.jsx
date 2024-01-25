import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./searchBar.css"
import search from "../../images/search.png"
import { Link } from "react-router-dom";


function SearchBar(){
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = async() => {
        if(searchValue.trim() !== ''){
            
            dispatch(fetchSearch(searchValue))
            
        }else{
            dispatch(clearSearchTrails())
        }
    }

    return (
        <div className="searchBar">
            
            <input 
            type="text"
            placeholder="Search by trail name" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="searchBarInput"
            />
            <Link to="/trails/search" id="searchBarButton"><img src={search} alt="search" onClick={handleSearch}/></Link>
            
        </div>
    )
}

export default SearchBar