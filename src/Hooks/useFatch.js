import { useEffect, useState } from "react";
import axios from 'axios';
const useFatch = (url) =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(()=>{
        const fatchData = async ()=>{
            setLoading(true);
            try {
               const res =await axios.get(url)
               setData(res.data)
            } catch (err) {
                setError(err)
            };
            setLoading(false)
        }
        fatchData()
    }, [url]);
    const reFatch = async ()=>{
        setLoading(true);
        try {
           const res =await axios.get(url)
           setData(res.data)
        } catch (err) {
            setError(err)
        };
        setLoading(false)
    }
    return {data, loading, error , reFatch}

}
export default useFatch;