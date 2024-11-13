import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppBar } from './components/AppBar';
import { HomePage } from './components/HomePage';
import { SellPage } from './components/SellPage';
import { BuyPage } from './components/BuyPage';
import { Toaster } from './components/ui/toaster';


function App () {
  
  return (
    <div className='h-screen flex flex-col'> 
    <Toaster />

    <Router>
          <AppBar/>
          <Routes>
                  <Route path='/' element = {<HomePage/>}/>
                  <Route path="/sell" element ={<SellPage/>}/>
                  <Route path="/buy" element ={<BuyPage/>}/>
         </Routes>
    </Router>
              </div>
      );
}

export default App;
