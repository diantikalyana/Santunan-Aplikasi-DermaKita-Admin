import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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

const Dashboard = () => {
  return (
    <div className="flex min-h-screen font-raleway">
      <style>{fontStyle}</style>

      <Sidebar />

      <div className="flex-1 flex flex-col bg-white-100">
        <Navbar />

        <main className="p-6 bg-gray-100 flex-1">
          <p className="italic text-sm mb-4 text-gray-700">
            Menyalurkan kebaikan bukan hanya tugas, tapi panggilan hati. Selamat datang, Admin!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/data-anak-yatim">
              <div className="bg-[#493953] text-white p-6 rounded-xl shadow cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                <p className="font-semibold text-sm text-gray-200">Jumlah Anak Yatim</p>
                <h2 className="text-3xl font-bold mt-2">120</h2>
              </div>
            </Link>

            <Link to="/donasi">
              <div className="bg-[#493953] text-white p-6 rounded-xl shadow cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                <p className="font-semibold text-sm text-gray-200">Donasi Terkumpul</p>
                <h2 className="text-3xl font-bold mt-2">Rp5.000.000</h2>
              </div>
            </Link>

            <Link to="/donasi">
              <div className="bg-[#493953] text-white p-6 rounded-xl shadow cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-95">
                <p className="font-semibold text-sm text-gray-200">Donatur Aktif</p>
                <h2 className="text-3xl font-bold mt-2">25</h2>
              </div>
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
