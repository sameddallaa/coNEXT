import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const currentToken = localStorage.getItem("tokens");
  const [token, setToken] = useState(() =>
    currentToken ? JSON.parse(currentToken) : null
  );

  const [user, setUser] = useState(() =>
    currentToken ? jwtDecode(JSON.parse(currentToken).access) : null
  );
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const login = async (email, password) => {
    // const ENDPOINT = import.meta.LOGIN_URL;
    const ENDPOINT = "http://localhost:8000/api/token/";
    try {
      const response = await axios.post(
        ENDPOINT,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        setToken({ access: data.access, refresh: data.refresh });
        setUser(jwtDecode(data.access));
        localStorage.setItem("tokens", JSON.stringify(data));
        navigate("/");
        console.log(user);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const updateTokens = async () => {
    const UPDATE_TOKEN_URL = `http://localhost:8000/api/token/refresh/`;
    const response = await axios.post(
      UPDATE_TOKEN_URL,
      {
        refresh: token.refresh,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (response.status === 200) {
      setToken({ access: data.access, refresh: data.refresh });
      setUser(jwtDecode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      const intervalId = setInterval(() => {
        updateTokens();
      }, 1000 * 60 * 4);

      return () => clearInterval(intervalId);
    }
  }, [token]);

  useEffect(() => {
    async function fetchPfp() {
      if (user) {
        try {
          const PFP_ENDPOINT = `http://localhost:8000/api/users/${user.user_id}/pfp`;
          const response = await axios.get(PFP_ENDPOINT, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token.access,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            setProfileImage(data.profile_image);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchPfp();
  }, [user]);

  const contextData = {
    user: user,
    login: login,
    logout: logout,
    updateTokens: updateTokens,
    profileImage: profileImage,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
