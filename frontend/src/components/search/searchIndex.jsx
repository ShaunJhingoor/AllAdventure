import { useDispatch, useSelector } from "react-redux"
import SearchIndexItem from "./searchIndexItem";
import "./SearchIndex.css"
import SmallSearchBar from "../search/smallsearchbar";
import { useEffect } from "react";
import { Fetchtrails } from "../../store/trail";


function SearchIndex(){
    const searchResults = useSelector((state => Object.values(state.search.search|| {})))
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(Fetchtrails());
    }, [dispatch]);
    
    
    return (
      <>
        <div id="SearchIndexheader">
          <SmallSearchBar/>
        </div>

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
        </>
      );
    }
    
export default SearchIndex