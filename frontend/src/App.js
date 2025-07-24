import './App.css';
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyList from './pages/MyList';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
function App() {
  return (
   <div className='App'>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/myList" element={<MyList />} />
    </Routes>
    <Footer/>
   </div> 
   
  );
}

export default App;
