import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDetails } from "./../../slices/userSlice";
import { uploads } from "../../utils/config";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "./../../slices/photoSlice";
import Messages from "../../components/Messages";
import { Eye, Pen, Trash } from "phosphor-react";

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

  const [editId, setEditId] = useState("");
  const [editImage, setEditIamge] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");
    setImage();
    resetComponentMessage();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };

  const showOrHideForms = () => {
    newPhotoForm.current.classList.toggle("hidden");
    editPhotoForm.current.classList.toggle("hidden");
  };

  /* edit */
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    console.log(photoData);

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hidden")) {
      showOrHideForms();
    }

    setEditId(photo._id);
    setEditIamge(photo.image);
    setEditTitle(photo.title);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    showOrHideForms();
  };

  return (
    <div className="flex flex-col items-start justify-center p-10">
      {/* HEADER */}
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
      {/* FORMS */}
      <div className="py-20">
        {id === userAuth._id && (
          <>
            {/* NEW PUBLISH FORM */}
            <div className="space-y-5" ref={newPhotoForm}>
              <h1>Compartilhe algum momento seu:</h1>
              <form onSubmit={submitHandle}>
                <label className="block">
                  <span>Título da foto:</span>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
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

            {/* UPDATE FORM */}
            <div className="hidden" ref={editPhotoForm}>
              <h1>Editando postagem</h1>

              {editImage && (
                <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
              )}

              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                  className="border border-gray-300 p-2 rounded-md w-full  text-gray-700"
                />

                <input type="submit" value="Atualizar" />
                <button onClick={handleCancelEdit}>Cancelar edição</button>
              </form>
            </div>

            {errorPhoto && <Messages type="error" message={errorPhoto} />}
            {messagePhoto && <Messages message={messagePhoto} />}
          </>
        )}
      </div>
      {/* PUBLISH PHOTOS */}
      <div className="py-5">
        <h1>Fotos publicadas</h1>

        <div className="flex flex-wrap items-start justify-start gap-5">
          {photos &&
            photos.map((item) => (
              <div key={item._id}>
                {item.image && (
                  <img
                    className="w-36"
                    src={`${uploads}/photos/${item.image}`}
                    alt="image"
                  />
                )}
                {id === userAuth._id ? (
                  <div className="flex items-center justify-center gap-8 py-4">
                    <div>
                      <Link to={`/photos/${item._id}`}>
                        <Eye size={22} />
                      </Link>
                    </div>

                    <div className="cursor-pointer">
                      <Pen size={22} onClick={() => handleEdit(item)} />
                    </div>

                    <div className="cursor-pointer">
                      <Trash size={22} onClick={() => handleDelete(item._id)} />
                    </div>
                  </div>
                ) : (
                  <Link to={`/photos/${item._id}`}>Ver</Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Nenhuma foto publicada</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
