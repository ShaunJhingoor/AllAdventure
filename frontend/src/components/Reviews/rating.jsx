import "./Rating.css";

const Rating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default Rating;
