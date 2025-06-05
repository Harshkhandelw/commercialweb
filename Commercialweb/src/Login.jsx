import { useDispatch, useSelector } from "react-redux"
import { CheckLogin, DisplayLogin } from "./Reducer"
import { useState } from "react"
function Login() {
	const [Email, setEmail] = useState('')
	const [Pass, setPass] = useState('')
	const dispatch = useDispatch()
	const bool = useSelector(state => state.x.bool)
	function Hide() {
		dispatch(DisplayLogin({ bool: false }))
	}
	function Login1() {
		fetch('http://localhost:3003/Users').then((res) => {
			return res.json()
		}).then((data) => {
			let obj = data.find((v) => {
				return v.Email == Email
			})
			if (!obj) {
				alert('User not found')
			} else {
				if (obj.Pass == Pass) {
					dispatch(CheckLogin({
						obj,
						bool2: true,
						bool: false,
					}))
				} else {
					alert('Incorrect Password')
				}
			}
		})
	}
	return (
		<>
			<div className="Login-1" style={{
				display: (bool == true) ? 'flex' : 'none'
			}}>
				<div className='Login-box'>
					<i className="fa-solid fa-xmark p" onClick={Hide}></i>
					<span>Login</span>
					<div className='Login-filed'>
						<label>Login Id</label>
						<input type='text' placeholder='Enter your email' value={Email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className='Login-filed'>
						<label>Password</label>
						<input type='text' placeholder='Enter your password' onChange={(e) => setPass(e.target.value)} />
					</div>
					<div className='Login-2'>
						<div className='Text'>
							<span>Show:</span><input type="checkbox" />
						</div>
						<span>Forgot Password</span>
					</div>
					<button className='Btn' onClick={Login1}>Login</button>
					<div className='Login-3'>Don't have an account? <span className='Reg' >Register</span></div>
				</div>
			</div>
		</>
	)
}
export default Login