import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="flex flex-col items-start justify-center gap-10 max-w-md my-16 bg-white p-6 rounded-md shadow-md">
        <div className="text-center space-y-3">
          <h1 className="font-bold text-2xl">
            Faça seu login para interagir com seus amigos!!
          </h1>
          <p className="text-sm text-gray-700">
            Entre com user/pass 'global123' e tenha acesso a todas as rotas da
            aplicação
          </p>
        </div>

        <form className="flex flex-col gap-3 w-full">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-normal text-gray-500 text-sm"
            >
              Email
            </label>
            <input
              type="text"
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
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </div>
          <div className="flex flex-col items-end justify-end w-full gap-6">
            <button
              type="submit"
              className="bg-gray-700 py-3 rounded-md px-10 text-white"
            >
              Entrar
            </button>
            <div
              className="flex flex-col items-end justify-end
          border-t border-gray-300 pt-6 w-full"
            >
              <span>
                Não tem conta? Cadastre <Link to="/register">aqui</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
