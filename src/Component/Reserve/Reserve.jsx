import "./Reserve.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFatch from "../../Hooks/useFatch"
import { useContext, useState } from "react"
import { SearchContext } from "../../Context/Searchcontext"
const Reserve = ({setOpen, hotelId}) => {
    const [selectRoom, setSelectRoom] = useState([])
    const  {data, loading, error,reFatch } = useFatch(`/hotel/room/${hotelId}`)
    const {date} = useContext(SearchContext)

    const getDateRange = (startDate, endDate) =>{
        const start = new Date(startDate);
        const end =  new Date(endDate)
         const dates = new Date(start.getTime());

         let date = [];
         while(date <= end){
             date.push(new Date(dates).getTime())
             dates.setDate(dates.getDate() + 1)
         }
         return date
    }
    const allDates = getDateRange(date[0].startDate, date[0].endDate)

    
    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectRoom(
            checked ? [...selectRoom, value] : selectRoom.filter((item)=> item !== value)
        )
    }
    const handleClick =()=>{

    }
console.log(selectRoom);
  return (
    <div className='reserve'>
        <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} onClick={()=>setOpen(false)} className="rClose" />
        <span>Select your room:</span>
        {data.map((item)=>(
            <div className="rItem">
                <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                    <div className="rDesc">{item.price}</div>
                </div>
                {item.roomNumber.map((roomNumbers)=>(
                    <div className="room">
                        <label>{roomNumbers.number}</label>
                        <input type="checkbox" value={roomNumbers._id} onChange={handleSelect} />
                    </div>
                ))}
            </div>
        ))

        }
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
        </div>
  )
}

export default Reserve