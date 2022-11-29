import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>carregando...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="bg-gray-100">
          <div className="max-w-5xl m-auto">
            <Routes>
              <Route
                path="/"
                element={auth ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!auth ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!auth ? <Register /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
