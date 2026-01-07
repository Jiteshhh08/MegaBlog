import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .finally(() => setLoading(false));
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-4xl">Loading...</p>
        </div>
      );
    }
};
    return (
      <button
        className="inline-bock px-6 py-2 cursor-pointer duration-200 hover:bg-blue-500 hover:text-black rounded-full"
        onClick={logoutHandler}
      >
        Log out
      </button>
    );
}

export default LogoutBtn;
