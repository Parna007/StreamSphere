import './App.css';
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyList from './pages/MyList';
import Login from './pages/auth/Login';
function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsub();
  // }, []);

  return (
   <div className='App'>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/myList" element={<MyList />} />
    </Routes>
    <Footer/>
   </div> 
   
  );
}

export default App;
