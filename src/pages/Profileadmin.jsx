import React, { useState } from "react";
import Navbar from "../components/Navbar";

const ProfileAdmin = () => {
  const [formData, setFormData] = useState({
    username: "admin123",
    password: "adminpass",
    avatar: defaultAvatar,
  });

  const [theme, setTheme] = useState("dark");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-white to-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Profil Admin</h2>
          <div className="flex flex-col items-center mb-6">
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-300"
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="mt-2 text-sm" />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default ProfileAdmin;
