import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const fontStyle = `
  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-Regular.woff2') format('woff2');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-SemiBold.woff2') format('woff2');
    font-weight: 600;
  }
  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-Bold.woff2') format('woff2');
    font-weight: 700;
  }
  .font-raleway {
    font-family: 'Raleway', sans-serif;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Data Anak Yatim", to: "/data-anak-yatim" },
    { name: "Donasi", to: "/donasi" },
    { name: "Laporan", to: "/laporan" },
    { name: "Data Admin", to: "/dataadmin" },
    { name: "Artikel", to: "/artikel" },
    { name: "Dokumentasi", to: "/dokumentasi" },
  ];

 return (
  <>
    {/* Sidebar */}
    <div className="w-60 min-h-screen bg-gradient-to-b from-[#493953] via-[#8c809c] to-[#cab6e4] text-white px-2 py-6 flex flex-col justify-between">
      {/* Atas: Logo & Navigasi */}
      <div>
        <div className="flex items-center justify-center mb-10 text-raleway font-bold text-2xl">
          <img src={logo} alt="Logo" className="h-30 w-30" />
        </div>

        {/* Navigasi */}
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `py-2 px-4 rounded-l-full transition shadow-md ${
                  isActive
                    ? "bg-white text-[#493953] font-semibold drop-shadow-2xl ring-1 ring-black/10"
                    : "hover:bg-white hover:text-[#493953] font-semibold"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bawah: Tombol Logout */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-[#493953] py-3 px-8 rounded-xl shadow-xl hover:bg-purple-100 font-bold transition duration-300 hover:scale-105"
        >
          Log-out
        </button>
      </div>
    </div>

    {/* Modal Konfirmasi Logout */}
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl p-6 w-80 text-center shadow-xl animate-fade-in-down">
          <h2 className="text-xl font-semibold text-[#493953] mb-4">Keluar Aplikasi?</h2>
          <p className="text-sm text-gray-600 mb-6">
            Apakah kamu yakin ingin keluar dari aplikasi DermaKita?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Batal
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
};

export default Sidebar;
