import { useSelector } from "react-redux"

function SearchIndex(){
    const searchResults = useSelector((state => Object.values(state.search.search|| {})))
    console.log(searchResults)
    return (
        <>
        {searchResults.length > 0 ? 
        <div>
          
          {searchResults?.map((result) => (
            <div key={result.id}>
              <p>{result.name}</p>
            </div>
          ))}
        </div>: <h1>No results</h1>
        }
        </>
      );
    }
    
export default SearchIndex