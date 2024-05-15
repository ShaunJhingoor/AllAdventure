import { useDispatch, useSelector } from "react-redux"
import SearchIndexItem from "./searchIndexItem";
import "./SearchIndex.css"
import SmallSearchBar from "../search/smallsearchbar";
import { useEffect, useState } from "react";
import { FetchRange, trailsArray } from "../../store/trail";
import Footer from "../footer/Footer";
import { ArraySearch } from "../../store/search";



function SearchIndex(){
    const searchResults = useSelector(ArraySearch)
    const trails = useSelector(trailsArray)
    const dispatch = useDispatch()
    const [suggestedSearchLoading, setsuggestedSearchLoading] = useState(true)
  

  useEffect(() => {
      if(searchResults?.length == 0){
      dispatch(FetchRange(Number(12), Number(16))).
      then(() => setsuggestedSearchLoading(false))
      }
    },[dispatch, searchResults]);


   
    if(suggestedSearchLoading && searchResults?.length == 0){
      return (
        <div className="loading">
           <div className="loader4"></div>
        </div>
      );
    }
    if(searchResults.length === 0){
      return(
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
          <h1 id="numberOfSearch">Suggested Trails:</h1>
          <br />
          <div id="SearchIndexWrapper">
        
       { trails?.map((result, index) => (
          <SearchIndexItem key={index} result={result}  />
       ))}
          </div>
        </div>
        <Footer/>
        </>
      );
    }
    
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