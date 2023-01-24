import useFatch from "../../Hooks/useFatch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const  {data, loading, error } = useFatch("/hotel?featured=true&limit=2");
  return (
    <div className="fp">
      {loading ? "Loading" : <>
      {data.map((items)=>(<div className="fpItem" key={items._id}>
        <img
          src={items.photos[0]}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{items.name}</span>
        <span className="fpCity">{items.city}</span>
        <span className="fpPrice">Starting from {items.cheapPrice}</span>
        {items.rating && <div className="fpRating">
          <button>{items.rating}</button>
          <span>Excellent</span>
        </div>
  }
      </div>
      ))}
     </>
}
    </div>
  );
};

export default FeaturedProperties;
