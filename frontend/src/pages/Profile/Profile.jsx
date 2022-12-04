import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDetails } from "./../../slices/userSlice";
import { uploads } from "../../utils/config";
import { useRef } from "react";
import { publishPhoto, resetMessage } from "./../../slices/photoSlice";
import Messages from "../../components/Messages";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  // Publish a new photo
  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");
  };

  // change image state
  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  return (
    <div className="flex flex-col items-start justify-center p-10">
      <div className="flex flex-col md:flex-row items-start justify-start md:gap-10 w-full border-b border-gray-700 pb-10">
        <div className="w-36 h-36 object-cover">
          {user.profileImage && (
            <img
              src={`${uploads}/users/${user.profileImage}`}
              alt={user.name}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <h2 className="font-bold text-lg">{user.email}</h2>
        </div>
      </div>
      <div className="py-20">
        {id === userAuth._id && (
          <>
            <div className="space-y-5" ref={newPhotoForm}>
              <h1>Compartilhe algum momento seu:</h1>
              <form onSubmit={submitHandle}>
                <label className="block">
                  <span>Título da foto:</span>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    valeu={title || ""}
                    className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
                  />
                </label>

                <label className="block">
                  <span>Imagem:</span>
                  <input
                    type="file"
                    onChange={handleFile}
                    className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
                  />
                </label>
                {loading ? (
                  <input type="submit" disabled value="Aguarde..." />
                ) : (
                  <input type="submit" value="Postar" />
                )}
              </form>
            </div>

            {errorPhoto && <Messages type="error" message={errorPhoto} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
