import { useDispatch, useSelector } from "react-redux"
import SearchIndexItem from "./searchIndexItem";
import "./SearchIndex.css"
import SmallSearchBar from "../search/smallsearchbar";
import { useEffect } from "react";
import { Fetchtrails, trailsArray } from "../../store/trail";
import Footer from "../footer/Footer";
import { ArraySearch } from "../../store/search";
import { useState } from "react"


function SearchIndex(){
    const searchResults = useSelector(ArraySearch)
    const trails = useSelector(trailsArray)
    const dispatch = useDispatch()
    const [randomTrail, setRandomTrails] = useState([]);

    useEffect(() => {
      dispatch(Fetchtrails());
    }, [dispatch])

    useEffect(() => {
      const shuffledTrails = shuffle(trails);
      setRandomTrails(shuffledTrails);
    }, [trails]);

  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    if(searchResults.length === 0){
      return(
        <>
        <div id="SearchIndexContainer">
        <br />
        <span id="numberOfSearch">
          Number of Results: <span id="number">{searchResults.length}</span>
          </span>
          <br />
          <h1 id="numberOfSearch">Suggested Trails:</h1>
          <br />
          <div id="SearchIndexWrapper">
        {randomTrail.slice(0,6).map((trail,index) => 
          <SearchIndexItem key={`${trail?.id}_${index}`} result={trail} />)}
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