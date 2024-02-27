import React from "react";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="p-2 h-100">
      <Outlet />
    </div>
  );
};

export default Profile;
