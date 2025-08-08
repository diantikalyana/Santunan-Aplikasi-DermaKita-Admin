import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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

const Dokumentasi = () => {
  const navigate = useNavigate();

  const handleNavigate = (tujuan) => {
    navigate(tujuan);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-raleway">
      <style>{fontStyle}</style> {/* Tambahkan ini agar font-nya langsung aktif */}
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 flex flex-col items-center justify-center gap-10">
          <h1 className="text-3xl font-semibold text-gray-700">Dokumentasi Penyaluran</h1>
          <p className="text-md text-gray-600 text-justify-between max-w-xl">
            Klik salah satu untuk melihat dokumentasi. <br />
            <strong>Dokumentasi Khusus</strong> berisi penyaluran dana kepada anak-anak dengan kebutuhan <strong>urgensi</strong>. <br />
            <strong>Dokumentasi Umum</strong> mencakup seluruh dokumentasi penyaluran secara <strong>menyeluruh</strong>.
          </p>

          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <button
              onClick={() => handleNavigate("/dokumentasi/dokumentasiumum")}
              className="relative w-72 h-32 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700 text-white rounded-2xl text-2xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 group"
            >
              <span className="relative z-10">Dokumentasi Donasi Umum</span>
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-300"></div>
            </button>

            <button
              onClick={() => handleNavigate("/dokumentasi/dokumentasikhusus")}
              className="relative w-72 h-32 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700 text-white rounded-2xl text-2xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 group"
            >
              <span className="relative z-10">Dokumentasi Khusus</span>
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dokumentasi;
