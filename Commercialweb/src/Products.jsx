import { useDispatch, useSelector } from "react-redux"
import { CheckLogin2 } from "./Reducer"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { addProduct } from "./Reducer"
import { updateUser, updateCart } from "./Reducer"
function Products({ num, section }) {
	const User = useSelector(state => state.x.User)
	const Products = useSelector(state => state.x.Products)
	const bool2 = useSelector(state => state.x.bool2)
	const dispatch = useDispatch()
	useEffect(() => {
		fetch('http://localhost:3003/Products').then((res) => {
			return res.json()
		}).then((data) => {
			dispatch(addProduct({ data }))
		})
	}, [dispatch])

	const product = useSelector(state => state.x.Products)
	function Check() {
		dispatch(CheckLogin2({ bool: true }))
	}
	function addCart(id) {
		let obj = product.find((v) => {
			return id == v.id
		})
		obj = {
			...obj,
			'qty': 1,
			"totalPrice": obj.price
		}
		if ((obj && !User.cart.some((item) => item.id === obj.id))) {
			fetch(`http://localhost:3003/Users/${User.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...User,
					"cart": [...User.cart, obj]
				})
			}).then((res) => {
				return res.json()
			}).then((data)=>{
				dispatch(updateUser({ data }))
			})
		}
		else {
			let object = User.cart.find((v) => {
				return id == v.id
			})
			let qty = Number(object.qty) + 1
			let object2 = Products.find((v) => {
				return id == v.id
			})
			let price3 = object2.price.split('$')
			let price2 = Number(price3[1])
			let totalPrice = price2 * qty
			let object3 = {
				...object,
				qty,
				totalPrice: '$' + totalPrice
			}
			let cart = User.cart.map((v)=>{ 
				  if(id == v.id){
					  return v = object3
				  } else{
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
					   cart : [...cart]
				})
			}).then((res) => {
				if(res){
					dispatch(updateCart({ object3 }))
				}
			})
		}
	}
	return (
		<>
			<div className="container">
				<div className="product-section">
					<div className="row">
						{
							(section == 'Products') ? <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
								<h2 className="mb-4 section-title">Crafted with excellent material.</h2>
								<p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
								<p><a href="shop.html" className="btn">Explore</a></p>
							</div> : ""
						}
						{
							product && product.map((v, i) => {
								if (i < num) {
									return (
										<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={i}>
											<Link className="product-item">
												<img src={v.img} className="img-fluid product-thumbnail" />
												<h3 className="product-title">{v.title}</h3>
												<strong className="product-price">{v.price}</strong>

												<span className="icon-cross" onClick={() => (bool2 == true) ? addCart(v.id) : Check()}>
													<img src="images/cross.svg" className="img-fluid" />
												</span>
											</Link>
										</div>
									)
								}

							})

						}
					</div>
				</div>
			</div>
		</>
	)
}
export default Products 