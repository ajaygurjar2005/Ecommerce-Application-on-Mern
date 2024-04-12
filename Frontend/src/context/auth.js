import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common['Authorization'] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token
      })
    }
  }, [])

  return (
    <DataContext.Provider value={{ auth, setAuth }}>
      {children}
    </DataContext.Provider>
  );
};

export const useAuth = () => useContext(DataContext);

export default DataProvider;

