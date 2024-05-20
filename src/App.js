import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Импорт BrowserRouter
import Layout from './components/Layout/Layout';
import Room from './pages/Room/Room';
import Shop from './pages/Shop/Shop';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import ProductDetail from './pages/Product/ProductDetail';
import Contact from './pages/Contact/Contact'; 
import './styles.css/style.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/> 
          <Route path='/room' element={<Room/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


