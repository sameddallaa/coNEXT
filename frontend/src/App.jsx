import { useContext, useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import SiteNavbar from "./Components/SiteNavbar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { UtilsProvider } from "./Contexts/UtilsContext.jsx";
import LoggedOutRoute from "./Routes/LoggedOutRoute.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import Homepage from "./Components/Homepage.jsx";
function App() {
  console.log();
  return (
    <BrowserRouter>
      <AuthProvider>
        <UtilsProvider>
          <Routes>
            <Route element={<ProtectedRoute />}></Route>
            <Route element={<LoggedOutRoute />}>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </UtilsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
