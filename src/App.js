import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import MainScreen from "./Component/MainScreen";
import Register from "./Component/Register";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainScreen />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
