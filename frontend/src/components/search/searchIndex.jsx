import { useDispatch, useSelector } from "react-redux"
import SearchIndexItem from "./searchIndexItem";
import "./SearchIndex.css"
import SmallSearchBar from "../search/smallsearchbar";
import { useEffect } from "react";
import { Fetchtrails } from "../../store/trail";
import Footer from "../footer/Footer";
import { ArraySearch } from "../../store/search";


function SearchIndex(){
    const searchResults = useSelector(ArraySearch)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(Fetchtrails());
    }, [dispatch])
  
    
    return (
      <>
        <div id="SearchIndexheader">
          <SmallSearchBar/>
        </div>
        <br />
      <div id="SearchIndexContainer">
        <br />
        <span id="numberOfSearch">
          Number of Results: <span id="number">{searchResults.length}</span>
          </span>
          <br />
        <div id="IndexWrapper" >
        <div id="SearchIndexWrapper">
          {searchResults?.map((result) => (
            <SearchIndexItem result={result} key={result.id}/>
          ))}
          </div>
        </div>
        
        </div>
      
        
        <Footer/>
        </>
      );
    }
    
export default SearchIndex