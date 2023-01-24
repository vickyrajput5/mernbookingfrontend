import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/Authcontext'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [credential, setCredential] = useState({
        username:undefined,
        password:undefined,
    })
const {loading ,dispatch, error}= useContext(AuthContext)

const navigate = useNavigate();

const handleChange = (e) =>{
    setCredential((prev)=>({...prev, [e.target.id]: e.target.value}))
}
const handleClick = async (e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
        const res = await axios.post("/auth/login", credential);
        dispatch({type:"LOGIN_SUCCESS", payload:res.data})
        navigate("/")
    } catch (err) {
        dispatch({type:"LOGIN_FAIL", payload:err.response.data})
    }
}

  return (
    <div className='login'>
        <div className="lContainer">
            <form >
                <input type="text" placeholder='username' id='username' onChange={handleChange} className='lInput' />
                <input type="password" placeholder='Password' id='password' onChange={handleChange} className='lInput' />
                <button disabled={loading} onClick={handleClick} className='lButton'>Login</button>
                {error && <span>{error.message}</span>}
            </form>
        </div>
    </div>
  )
}
