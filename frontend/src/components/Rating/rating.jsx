import { useState } from "react";
import "./rating.css"
const Ratings = ({rating,setRating}) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    // const [Rating, setSelectedRating] = useState(initialRating);
  
    const handleStarClick = (rating) => {
      setRating(rating);
    };
  
    const handleStarMouseEnter = (rating) => {
      setHoveredRating(rating);
    };
  
    const handleStarMouseLeave = () => {
      setHoveredRating(0);
    };
  
    return (
      <div className='star-root'>
        <div className="rate">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={i < (hoveredRating || rating) ? 'filled' : ''}
              onClick={() => handleStarClick(i + 1)}
              onMouseEnter={() => handleStarMouseEnter(i + 1)}
              onMouseLeave={handleStarMouseLeave}
            >
              ★
            </i>
          ))}
        </div>
      </div>
    );
  };
  
  export default Ratings;