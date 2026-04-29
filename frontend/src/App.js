import {
 //BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

import Login
from "./pages/auth/Login";

import AuthSuccess
from "./pages/auth/AuthSuccess";

import Home
from "./pages/Home";

function App() {

 return (

  // <BrowserRouter>

  <Routes>

    <Route
      path="/"
      element={<Login />}
    />

    <Route
      path="/auth/success"
      element={<AuthSuccess />}
    />

    <Route
      path="/home"
      element={<Home />}
    />


   </Routes>

  // </BrowserRouter>

 );
}

export default App;