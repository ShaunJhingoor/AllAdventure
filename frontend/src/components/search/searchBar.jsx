import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearSearchTrails, fetchSearch } from "../../store/search";
import "./searchBar.css"
import search from "../../images/search.png"
import SearchIndex from "./searchIndex";

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
            <img src={search} alt="search" id="searchBarButton" onClick={handleSearch}/>
            <SearchIndex />
        </div>
    )
}

export default SearchBar