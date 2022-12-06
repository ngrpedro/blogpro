import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploads } from "../../utils/config";
import { useSelector } from "react-redux";
import Messages from "../../components/Messages";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handlefile = (e) => {
    const image = e.target.files[0];

    setPreviewImage(image);

    setProfileImage(image);
  };

  return (
    <div>
      <div className="py-20 flex flex-col items-start justify-center gap-14 max-w-md m-auto">
        <div className="w-36 h-36">
          {(user.profileImage || previewImage) && (
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user.profileImage}`
              }
              className="w-36 h-36 rounded-md object-cover"
              alt={user.name}
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center gap-5 max-w-md m-auto"
        >
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
            defaultValue={email || ""}
            className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
          />
          <label>
            <span>Imagem de perfil:</span>
            <input
              type="file"
              onChange={handlefile}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </label>

          <label className="w-full">
            <span>Bio:</span>
            <input
              type="text"
              placeholder="Seu perfil"
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </label>
          <label className="w-full">
            <span>Quer alterar sua senha?</span>
            <input
              type="text"
              placeholder="Nova senha"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
            />
          </label>

          <button
            type="submit"
            className="bg-gray-700 py-3 rounded-md px-10 text-white disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Aguarde..." : "Atualizar"}
          </button>
        </form>

        {error && <Messages type="error" message={error} />}
        {message && <Messages message={message} />}
      </div>
    </div>
  );
};

export default EditProfile;
