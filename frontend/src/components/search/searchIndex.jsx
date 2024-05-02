import { useDispatch, useSelector } from "react-redux"
import SearchIndexItem from "./searchIndexItem";
import "./SearchIndex.css"
import SmallSearchBar from "../search/smallsearchbar";
import { useEffect } from "react";
import { Fetchtrails, trailsArray } from "../../store/trail";
import Footer from "../footer/Footer";
import { ArraySearch } from "../../store/search";
// import { useState } from "react"


function SearchIndex(){
    const searchResults = useSelector(ArraySearch)
    const trails = useSelector(trailsArray)
    const dispatch = useDispatch()

    function getRandomNumber() {
      return Math.floor(Math.random() * 20) + 1;
    }

    const num1 = getRandomNumber()

    const getNum2 = (num1) => {
      if(num1 > 14){
          return num1 - 6
      }else if(num1 <= 14){
          return num1 + 6
      }
  }

  const num2 = getNum2(num1)

    useEffect(() => {
      dispatch(Fetchtrails());
    }, [dispatch])

  
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
          {num1 < num2 ? (
        trails?.slice(num1, num2)?.map((result, index) => (
          <SearchIndexItem key={index} result={result}  />
        ))
      ) : (
        trails?.slice(num2 - 2, num1 - 2)?.map((result, index) => (
          <SearchIndexItem key={index} result={result}  />
        ))
      )}
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