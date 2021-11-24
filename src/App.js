import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';

import Navigation from "./components/routes/navigation";


function App() {
  return (
    <div>
      <Navigation />
      <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
    
  );
}

export default App;
