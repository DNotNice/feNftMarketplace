import './App.css';
import { AppBar } from './components/AppBar';
import { HomePage } from './components/HomePage';


function App () {
  return (
               <div className='h-screen flex flex-col'> 
                <AppBar/>
                <HomePage/>
                </div>
      );
}

export default App;
