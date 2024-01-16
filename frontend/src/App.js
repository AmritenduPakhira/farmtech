import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Homepage';
import About from './pages/AboutUs'
import Blogging from './pages/Farmb';
import PostBlog from './pages/PostBlog'
import Header from './components/Header'
import Footer from './components/Footer'
import PhotoGallery from './pages/PhotoGallery';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import Product from './pages/Product';
import Cart from './pages/Cart';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header />  
        <Routes>
          <Route path='home' element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='blogging' element={<Blogging />}></Route>
          <Route path='postblog' element={<PostBlog/>}></Route>
          <Route path='product' element={<Product/>}></Route>
          <Route path='contact' element={<ContactUs />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='Photogallery' element={<PhotoGallery />}></Route>
          <Route path='/' element={<Login />}></Route>
        </Routes>
        <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
