import "./hotel.css";
import Navbar from "../../Component/Navbar/Navbar";
import Header from "../../Component/Header/Header";
import MailList from "../../Component/mailList/MailList";
import Footer from "../../Component/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFatch from "../../Hooks/useFatch";
import {  useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/Searchcontext";
import { AuthContext } from "../../Context/Authcontext";
import Reserve from "../../Component/Reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id= location.pathname.split('/')[2]
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
 

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const  {data, loading, error,reFatch } = useFatch(`/hotel/find/${id}`)
  const {date , options} = useContext(SearchContext);

  console.log(date)
  const MILISECOUND_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDiff(date1, date2){
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const DiffDay = Math.ceil(timeDiff / MILISECOUND_PER_DAY);
    return DiffDay
  }
 const days = dayDiff(date[0].endDate, date[0].startDate)
 console.log(days)

 const {user}= useContext(AuthContext)
 const navigate = useNavigate();

const handleClick = ()=>{
if(user){
setOpenModel(true)
}else{
 navigate("/login")
}
}
  return (
    <div>
      <Navbar />
      <Header type="list" />
      { loading ? "Loading...." : (
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over {data.cheapPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo[0]}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.name}</h1>
              <p className="hotelDesc">
              {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of {data.rating}!
              </span>
              <h2>
                <b>${days * data.cheapPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      )
}
{openModel && <Reserve setOpen={setOpenModel} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
