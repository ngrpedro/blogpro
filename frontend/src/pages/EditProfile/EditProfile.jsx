import React, { useState } from "react";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  return (
    <div>
      <div className="py-20 flex flex-col items-start justify-center gap-14 max-w-md m-auto">
        <div className="bg-gray-600 w-36 h-36 rounded-md">
          <img src="" alt="" />
        </div>
        <form className="flex flex-col items-start justify-center gap-5 max-w-md m-auto">
          <input
            type="text"
            placeholder="Nome"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
          />
          <input
            type="text"
            placeholder="Email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
          />
          <input
            type="text"
            placeholder="Senha"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
          />
          <label>
            <span>Imagem de perfil:</span>
            <input
              type="file"
              name=""
              id=""
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </label>

          <label className="w-full">
            <span>Bio:</span>
            <input
              type="text"
              placeholder="Bio"
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </label>
          <label className="w-full">
            <span>Quer alterar sua senha?</span>
            <input
              type="password"
              placeholder="Digite sua nova senha..."
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </label>

          <button
            type="submit"
            className="bg-gray-700 py-3 rounded-md px-10 text-white disabled:bg-gray-500"
            /* disabled={loading} */
          >
            {/* {loading ? "Aguarde..." : "Entrar"} */}
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
