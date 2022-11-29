import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDetails } from "./../../slices/userSlice";
import { uploads } from "../../utils/config";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <div className="flex items-center justify-center p-10 h-[80vh]">
      <div className="flex flex-col md:flex-row items-start justify-start md:gap-4">
        <div className="w-36 h-36 rounded-md object-cover bg-gray-600">
          {user.profileImage && (
            <img
              src={`${uploads}/users/${user.profileImage}`}
              alt={user.name}
            />
          )}
        </div>
        <div className="flex flex-col gap-1 max-w-lg">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <h2 className="font-bold text-lg">{user.email}</h2>
          <span>{user.bio}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
