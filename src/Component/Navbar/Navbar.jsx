import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/Authcontext"
import "./navbar.css"

 const Navbar = () => {
  const {user}= useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">lamabooking</span>
        {user ? user.username : (<div className="navItems">
          <button className="navButton">Register</button>
         <Link to="/login">
         <button className="navButton">Login</button>
         </Link>
        </div>)}
      </div>
    </div>
  )
}
export default Navbar