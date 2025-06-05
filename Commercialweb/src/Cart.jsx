import { useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { changeqty,Remove, updateCart,updateCart2 } from "./Reducer"
import { useNavigate } from "react-router-dom"
function Cart() {
    const navigate = useNavigate()
    const User = useSelector(state => state.x.User)
    const [TotalPrice, setTotal] = useState(null)
    const dispatch = useDispatch()
    const [object, setObject] = useState({
        id: '',
        qty: '',
    })
    function updatecart(id, value) {
        dispatch(changeqty({
            id,
            qty: Number(value)
        }))
        let obj = User.cart.find((v, i) => {
            return v.id == id
        })
        setObject({
            id: obj.id,
            qty: obj.qty
        })
    }
    function Update() {
        let obj = User.cart.find((v) => {
            return object.id == v.id
        })
       
        let qty = obj.qty
        let price3 = obj.price.split('$')
        let price2 = Number(price3[1])
        let Totalprice = price2 * qty
        obj ={
            ...obj,
            totalPrice: "$" + Totalprice,
        } 
        let cart = User.cart.map((v) => {
            if (object.id == v.id) {
                return v = { ...obj}
            } else {
                return v
            }
        })
        fetch(`http://localhost:3003/Users/${User.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...User,           
                cart: [...cart]
            })
        }).then((res) => {
            if (res) {
                dispatch(updateCart2({ obj }))
            }
        })
    }
    function ReducePrice(id) {
        let obj = User.cart.find((v) => {
            return id == v.id
        })
        let qty = obj.qty - 1
        let price = obj.price
        let price3 = price.split('$')
        let price2 = Number(price3[1])
        let object3 = {}
        let cart = []
        if (obj.qty >= 1) {
            let totalPrice = price2 * qty
            object3 = {
                ...obj,
                qty,
                totalPrice: '$' + totalPrice
            }
            cart = User.cart.map((v) => {
                if (id == v.id) {
                    return v = object3
                } else {
                    return v
                }
            })
        } else {
            cart = User.cart.filter((v) => {
                return id != v.id
            })
        }

        fetch(`http://localhost:3003/Users/${User.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...User,
                cart: [...cart]
            })
        }).then((res) => {  
            if (res) {
                if (obj.qty > 1) {
                    dispatch(updateCart({ object3 }))
                } else {
                    dispatch(Remove({ id }))
                }
            }
        })
    }
    function increasPrice(id) {
        let obj = User.cart.find((v) => {
            return id == v.id
        })
        let qty = Number(obj.qty) + 1
        let price = obj.price
        let price3 = price.split('$')
        let price2 = Number(price3[1])
        let totalPrice = price2 * qty
        let object3 = {
            ...obj,
            qty,
            totalPrice: '$' + totalPrice
        }
        let cart = User.cart.map((v) => {
            if (id == v.id) {
                return v = object3 
            } else {
                return v
            }
        })

        fetch(`http://localhost:3003/Users/${User.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...User,
                cart: [...cart]
            })
        }).then((res) => {
            if (res) {
                dispatch(updateCart({ object3 }))
            }
        })
    }
    function RemoveProduct(id) {
        let cart = User.cart.filter((v) => {
            return v.id !== id
        })
        fetch(`http://localhost:3003/Users/${User.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...User,
                cart: [...cart]
            })
        }).then((res) => {
            if (res) {
                dispatch(Remove({ id }))
            }
        })
    }

    function GoToShop() {
        navigate('/Shop')
    }
    useEffect(() => {
        if (User && User.cart) {
            let arr = User.cart.map((v) => {
                return v.totalPrice
            })
            let str = arr.toString()
            let str2 = str.replaceAll('$', '')
            let arr2 = str2.split(',');
            const total = arr2.reduce((a, b) => {
                return Number(a) + Number(b)
            })
            setTotal(total)
        }
    }, [User])
    return (
        <>
            <Navbar></Navbar>
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Cart</h1>
                            </div>
                        </div>
                        <div className="col-lg-7">

                        </div>
                    </div>
                </div>
            </div>
            <div className="untree_co-section before-footer-section">
                <div className="container">
                    <div className="row mb-5">
                        <form className="col-md-12" method="post">
                            <div className="site-blocks-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail">Image</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-total">Total</th>
                                            <th className="product-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            User.cart && User.cart.map((v, i) => {

                                                return (
                                                    <>
                                                        <tr key={v.id}>
                                                            <td className="product-thumbnail">
                                                                <img src={v.img} alt="Image" className="img-fluid" />
                                                            </td>
                                                            <td className="product-name">
                                                                <h2 className="h5 text-black">Product {i}</h2>
                                                            </td>
                                                            <td>{v.price}</td>
                                                            <td>
                                                                <div className="input-group mb-3 d-flex align-items-center quantity-container" >
                                                                    <div className="input-group-prepend">
                                                                        <button className="btn btn-outline-black decrease" type="button" onClick={() => ReducePrice(v.id)}>&minus;</button>
                                                                    </div>
                                                                    <input type="text" className="form-control text-center quantity-amount" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value={v.qty} onChange={(e) => updatecart(v.id, e.target.value)} />
                                                                    <div className="input-group-append">
                                                                        <button className="btn btn-outline-black increase" type="button" onClick={() => {
                                                                            increasPrice(v.id)
                                                                        }}>+</button>
                                                                    </div>


                                                                </div>


                                                            </td>
                                                            <td>{v.totalPrice}</td>
                                                            <td><a onClick={() => RemoveProduct(v.id)} className="btn btn-black btn-sm">X</a></td>
                                                        </tr>
                                                    </>
                                                )

                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mb-5">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <button className="btn btn-black btn-sm btn-block" onClick={Update}>Update Cart</button>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-outline-black btn-sm btn-block" onClick={GoToShop}>Continue Shopping</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="text-black h4" htmlFor="coupon">Coupon</label>
                                    <p>Enter your coupon code if you have one.</p>
                                </div>
                                <div className="col-md-8 mb-3 mb-md-0">
                                    <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-black">Apply Coupon</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pl-5">
                            <div className="row justify-content-end">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-12 text-right border-bottom mb-5">
                                            <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <span className="text-black">Subtotal</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">{TotalPrice}</strong>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <span className="text-black">Total</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">{TotalPrice}</strong>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-black btn-lg py-3 btn-block" >Proceed To Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer-section">
                <div className="container relative">

                    <div className="sofa-img">
                        <img src="images/sofa.png" alt="Image" className="img-fluid" />
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="subscription-form">
                                <h3 className="d-flex align-items-center"><span className="me-1"><img src="images/envelope-outline.svg" alt="Image" className="img-fluid" /></span><span>Subscribe to Newsletter</span></h3>

                                <form action="#" className="row g-3">
                                    <div className="col-auto">
                                        <input type="text" className="form-control" placeholder="Enter your name" />
                                    </div>
                                    <div className="col-auto">
                                        <input type="email" className="form-control" placeholder="Enter your email" />
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary">
                                            <span className="fa fa-paper-plane"></span>
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="row g-5 mb-5">
                        <div className="col-lg-4">
                            <div className="mb-4 footer-logo-wrap"><a href="#" className="footer-logo">Furni<span>.</span></a></div>
                            <p className="mb-4">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>

                            <ul className="list-unstyled custom-social">
                                <li><a href="#"><span className="fa fa-brands fa-facebook-f"></span></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-twitter"></span></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-instagram"></span></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-linkedin"></span></a></li>
                            </ul>
                        </div>

                        <div className="col-lg-8">
                            <div className="row links-wrap">
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">About us</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Contact us</a></li>
                                    </ul>
                                </div>

                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Support</a></li>
                                        <li><a href="#">Knowledge base</a></li>
                                        <li><a href="#">Live chat</a></li>
                                    </ul>
                                </div>

                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Jobs</a></li>
                                        <li><a href="#">Our team</a></li>
                                        <li><a href="#">Leadership</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                    </ul>
                                </div>

                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Nordic Chair</a></li>
                                        <li><a href="#">Kruzo Aero</a></li>
                                        <li><a href="#">Ergonomic Chair</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="border-top copyright">
                        <div className="row pt-4">
                            <div className="col-lg-6">
                                <p className="mb-2 text-center text-lg-start">Copyright  All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a>
                                </p>
                            </div>

                            <div className="col-lg-6 text-center text-lg-end">
                                <ul className="list-unstyled d-inline-flex ms-auto">
                                    <li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </footer>
        </>
    )
}
export default Cart