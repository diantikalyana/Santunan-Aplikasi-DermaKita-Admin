import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Bell } from "lucide-react";

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

const dummyNotifikasi = [
  {
    id: 1,
    judul: "Permintaan Donasi Baru",
    pesan: "User Andi mengajukan bantuan untuk anak yatim.",
    pengirim: "Andi",
    peran: "User",
    tanggal: "2025-08-03T12:20:00",
  },
  {
    id: 2,
    judul: "Laporan Kegiatan",
    pesan: "Relawan Budi telah mengunggah laporan kunjungan.",
    pengirim: "Budi",
    peran: "Relawan",
    tanggal: "2025-08-03T08:45:00",
  },
  {
    id: 3,
    judul: "Update Data Anak Yatim",
    pesan: "User Sari memperbarui data profil anak yatim.",
    pengirim: "Sari",
    peran: "User",
    tanggal: "2025-08-02T16:00:00",
  },
];

const Notifikasi = () => {
  const [notifList, setNotifList] = useState([]);

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setNotifList(dummyNotifikasi);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen font-raleway bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Bell className="text-purple-700" />
            Notifikasi Masuk
          </h1>

          {notifList.length === 0 ? (
            <p className="text-gray-500 italic">Memuat notifikasi...</p>
          ) : (
            <ul className="space-y-4">
              {notifList.map((notif) => (
                <li
                  key={notif.id}
                  className="bg-white rounded-xl shadow p-4 border-l-4 border-purple-500"
                >
                  <p className="text-sm text-gray-500">
                    {new Date(notif.tanggal).toLocaleString()}
                  </p>
                  <p className="font-semibold text-gray-800">{notif.judul}</p>
                  <p className="text-gray-700 text-sm mt-1">{notif.pesan}</p>
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Dari: {notif.pengirim} ({notif.peran})
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;
