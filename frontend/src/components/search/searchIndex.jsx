import { useSelector } from "react-redux"
import SearchIndexItem from "./searchIndexItem";
import "./SearchIndex.css"
import SmallSearchBar from "../search/smallsearchbar";


function SearchIndex(){
    const searchResults = useSelector((state => Object.values(state.search.search|| {})))
 

    return (
      <>
        <div id="SearchIndexheader">
          <SmallSearchBar/>
        </div>
        {searchResults.length > 0 ? 
        <div id="SearchIndexWrapper" >
        <div>
          {searchResults?.map((result) => (
            <SearchIndexItem result={result} key={result.id}/>
          ))}
          </div>
        </div>: <h1>No results</h1>
        }
        
        </>
       
      );
    }
    
export default SearchIndex