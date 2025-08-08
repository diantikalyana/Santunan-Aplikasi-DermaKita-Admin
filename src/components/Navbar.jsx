import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const dataList = [
  { id: 1, title: "Donasi Anak Yatim", path: "/Donasi" },
  { id: 2, title: "Laporan", path: "/Laporan" },
  { id: 3, title: "Pengajuan Anak Yatim", path: "data-anak-yatim/Detailanak" },
  { id: 4, title: "Profil Admin", path: "/profil" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [notifClicked, setNotifClicked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = dataList.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(item.path);
  };

  const handleNotifClick = () => {
    setNotifClicked(true);
    setTimeout(() => {
      setNotifClicked(false);
      navigate("/notifikasi");
    }, 300);
  };

  const handleProfileClick = () => {
    navigate("/profileadmin");
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-b-2xl relative z-10">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Telusuri..."
          className="w-full pl-12 pr-4 py-2 rounded-full bg-white text-sm text-gray-700 shadow-md ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#493953] placeholder:text-gray-400 font-semibold"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />

        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg max-h-52 overflow-y-auto z-50">
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-sm text-gray-700"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <img
          src="/icons/notif-icon.svg"
          alt="Notifikasi"
          onClick={handleNotifClick}
          className={`w-10 h-10 cursor-pointer transform transition-transform duration-300 ${
            notifClicked ? "scale-110" : ""
          }`}
        />
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
          <img
            src="/icons/user-icon.svg"
            alt="ProfileAdmin"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm text-right leading-tight">
            <p className="font-semibold text-gray-800">Fulan</p>
            <p className="text-sm text-gray-500">Superadmin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
