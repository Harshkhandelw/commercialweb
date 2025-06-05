import { Link} from "react-router-dom"
import Login from "./Login" 
import { useDispatch,useSelector } from "react-redux"
import { DisplayLogin ,Logout} from "./Reducer"
import { useEffect, useState } from "react"

function Navbar(){
    const [total,setTotal] = useState(null)
    const User = useSelector((state)=> state.x.User)
    const bool2 = useSelector(state => state.x.bool2)
    const dispatch = useDispatch()
    function Login1(){
        dispatch(DisplayLogin({bool : true}))
    }
     function Logout1(){
         let obj = {};
          dispatch(Logout({obj,
            bool : false,
            bool2 : false,
        }))
     }
     useEffect(()=>{
        if(User && User.cart){
                let arr = User.cart.map((v)=>{
                    return v.qty
                 })
               console.log(arr)
               if(arr.length > 0){
                const total = arr.reduce((a,b)=>{
                    return Number(a)+ Number(b)
                 })
                 setTotal(total)
               }
        } 
    },[User])
     return(
        <>
        <Login></Login>
        <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

<div className="container">
    <a className="navbar-brand" href="index.html">Furni<span>.</span></a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsFurni">
        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
        <li className="nav-item active">
                        <Link className="nav-link" to='/'>Home</Link>
                     </li>
                     <li><Link className="nav-link" to='/Shop'>Shop</Link></li>
                     <li><Link className="nav-link" to='/About'>About us</Link></li>
                     <li><Link className="nav-link" to='/Service'>Services</Link></li>
                     <li><Link className="nav-link" to='/Blog'>Blog</Link></li>
                     <li><Link className="nav-link" to='/Contact'>Contact us</Link></li>
                    {(bool2 == true)? <li><Link className="nav-link" onClick={Logout1}>Logout</Link></li> : <li><Link className="nav-link" onClick={Login1}>Login</Link></li>}
                
                     { (bool2 == true)? '': <li><Link className="nav-link" to='/Register'>Register</Link></li>}
                                     
        </ul>
       {
     (bool2 == true)? <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
        
       <li><a className="nav-link" href="#"><img src="images/user.svg"/></a></li>
       <li className="p-relative">
       {(total !== null && total >= 1)?<span className="sticker">{total}</span>:''}<Link className="nav-link" to='/Cart'><img src="images/cart.svg"/></Link></li>
   </ul> : ''
       }
    </div>
</div>
    
</nav>
</>
     )
}
export default Navbar