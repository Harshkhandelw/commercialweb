import { BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Home from './Home'
import Register from './Register'
import Shop from './Shop'
import About from './About'
import Service from './Service'
import Blog from './Blog'
import Contact from './Contactus'
import Cart from './Cart'
function App() {
  
  return (
     <>
     <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/Register' element={<Register></Register>}></Route>
        <Route path='/Shop' element={<Shop></Shop>}></Route>
        <Route path='/About' element={<About></About>}></Route>
        <Route path='/Service' element={<Service></Service>}></Route>
        <Route path='/Blog' element={<Blog></Blog>}></Route>
        <Route path='/Contact' element={<Contact></Contact>}></Route>
        <Route path='/Cart' element={<Cart></Cart>}></Route>
      </Routes>
      </BrowserRouter>
     </div>
     </>
  )
}

export default App