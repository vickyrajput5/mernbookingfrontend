import "./Reserve.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFatch from "../../Hooks/useFatch"
import { useState } from "react"
const Reserve = ({setOpen, hotelId}) => {
    const [selectRoom, setSelectRoom] = useState([])
    const  {data, loading, error,reFatch } = useFatch(`/hotel/room/${hotelId}`)
    
    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectRoom(
            checked ? [...selectRoom, value] : selectRoom.filter((item)=> item !== value)
        )
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
        </div>
        </div>
  )
}

export default Reserve