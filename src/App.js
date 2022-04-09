import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import About from './components/About/About';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>  
    </div>
  );
}

export default App;
