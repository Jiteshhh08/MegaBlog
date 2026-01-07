import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import conf from "./conf/conf";
import authService from "./appwrite/auth";
import { Header, Footer } from "./components"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    }
  ).finally(() => setLoading(false))
  }, []);

   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-4xl">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-blue-500">
        <div className="w-full block">
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
