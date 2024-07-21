import { useContext, useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { UtilsProvider } from "./Contexts/UtilsContext.jsx";
import LoggedOutRoute from "./Routes/LoggedOutRoute.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import Homepage from "./Components/Homepage.jsx";
import Chats from "./Components/Chats.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UtilsProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/chats/:chatId?" element={<Chats />} />
            </Route>
            <Route element={<LoggedOutRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/profiles/:profileId" element={<Profile />} />
          </Routes>
        </UtilsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
