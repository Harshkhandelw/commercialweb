import { useNavigate } from 'react-router-dom'
import './login.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
let id = 1;
function Register() {
    const [state,setState] = useState([])
    useEffect(()=>{
       fetch('http://localhost:3003/Users').then((res)=>{
          return res.json();
       }).then((data)=>{
          setState(data)
          data.forEach((v,i) => {
              if(v){
                  id = Number(v.id)+1
              }
          });
       })
    },[])
    const nevigate = useNavigate()
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Pass, setPass] = useState('')
    const [Cpass, setCpass] = useState('')
    function RegisterX(event) {
        event.preventDefault();
        let obj = {
            id,
            Name,
            Email,
            Pass,
            cart : [] 
        }
        if (Pass !== Cpass) {
            alert('Passwords do not match');
            return;
        }
        let userExists = state.some(user => user.Email === Email);
        if(!userExists)
        {
            fetch('http://localhost:3003/Users',{
                method : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            }).then((res)=>{
                if(res){
                    alert('Registerd Succesfully')
                    nevigate('/')
                    return res.json
                 }
                })
        }else{
            alert('Email already exsits')
        }
        setName('')
      setEmail('')
      setPass('')
      setCpass('')
    }
    return (
        <div className='L-body'>
            <div className="Login">
                    <form action="" onSubmit={(e)=>{RegisterX(e)}} className='Login-box'>
                    <span>Register</span>
                    <div className='Login-filed'>
                        <label>Enter your name</label>
                        <input type='text' placeholder='Enter your name' value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='Login-filed'>
                        <label>Enter your email</label>
                        <input type='text' placeholder='Enter your email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='Login-filed'>
                        <label>Create your password</label>
                        <input type='text' placeholder='Enter your password' value={Pass} onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <div className='Login-filed'>
                        <label>Confirm password</label>
                        <input type='text' placeholder='Enter your password' value={Cpass} onChange={(e) => setCpass(e.target.value)} />
                    </div>
                    <div className='Login-2'>
                        <div className='Text'>
                            <span>Show:</span><input type="checkbox" />
                        </div>
                    </div>
                    <input type='submit'/>
                    </form>
            </div>
        </div>
    )
}

export default Register