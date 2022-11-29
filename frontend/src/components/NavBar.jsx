import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MagnifyingGlass, SignOut } from "phosphor-react";
import { useAuth } from "./../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

import { logout, reset } from "../slices/authSlice";

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2 md:px-10 bg-gray-600 text-white">
        <Link>
          <h1>BlogPRO</h1>
        </Link>
        {auth && (
          <form className="flex items-center justify-center gap-2 border border-gray-500 rounded-md py-2 px-4">
            <MagnifyingGlass size={22} />
            <input type="text" className="bg-gray-600" />
          </form>
        )}
        <div className="flex items-center justify-center gap-5">
          {auth ? (
            <>
              <NavLink to="/">Home</NavLink>
              {user && (
                <>
                  <NavLink to={`/users/${user._id}`}>Usuário</NavLink>
                </>
              )}
              <NavLink to="/profile">Perfil</NavLink>

              <NavLink to="/">
                <span onClick={handleLogout}>
                  <SignOut size={32} />
                </span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Cadastrar</NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
