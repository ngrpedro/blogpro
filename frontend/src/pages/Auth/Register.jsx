import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../slices/authSlice";
import { useEffect } from "react";
import Messages from "../../components/Messages";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="flex flex-col items-start justify-center gap-10 max-w-md my-16 bg-white p-6 rounded-md shadow-md">
        <div className="text-center space-y-3">
          <h1 className="font-bold text-2xl">
            Faça seu cadastro para interagir com seus amigos!!
          </h1>
          <p className="text-sm text-gray-700">
            Registre e tenha acesso a todas as rotas da aplicação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-normal text-gray-500 text-sm">
              Nome
            </label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-normal text-gray-500 text-sm"
            >
              Email
            </label>
            <input
              type="text"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="senha"
              className="font-normal text-gray-500 text-sm"
            >
              Senha
            </label>
            <input
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="senha"
              className="font-normal text-gray-500 text-sm"
            >
              Confirme a senha
            </label>
            <input
              type="password"
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </div>

          <div className="flex flex-col items-end justify-end w-full gap-6">
            <button
              type="submit"
              className="bg-gray-700 py-3 rounded-md px-10 text-white"
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Entrar"}
            </button>
            <div
              className="flex flex-col items-end justify-end
                  border-t border-gray-300 pt-6 w-full"
            >
              <span>
                Já tem conta? Entre <Link to="/login">aqui</Link>
              </span>
            </div>
          </div>
        </form>
        {error && <Messages type="red" message={error} />}
      </div>
    </div>
  );
};

export default Register;
