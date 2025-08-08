import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);

const Laporan = () => {
  const navigate = useNavigate();

  const [laporanData, setLaporanData] = useState({
    totalDonasi: 0,
    jumlahAnak: 0,
    jumlahPenyalur: 0,
  });

  const [dataPerBulan, setDataPerBulan] = useState([]);

  useEffect(() => {
    // Ganti URL ini sesuai alamat API backend kamu
    axios.get("http://192.168.100.129:8000/api/laporan-donasi")
      .then((res) => {
        const { totalDonasi, jumlahAnak, jumlahPenyalur, grafikDonasi } = res.data;
        setLaporanData({ totalDonasi, jumlahAnak, jumlahPenyalur });
        setDataPerBulan(grafikDonasi);
      })
      .catch((err) => {
        console.error("Gagal mengambil data laporan:", err);
      });
  }, []);

  return (
    <div className="flex min-h-screen font-raleway">
      <style>{fontStyle}</style>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white-100">
        <Navbar />
        <main className="p-10 flex-1">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="bg-[#493953] text-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium">Total Donasi Masuk</h3>
              <p className="text-xl font-bold">{formatRupiah(laporanData.totalDonasi)}</p>
            </div>
            <div className="bg-[#493953] text-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium">Jumlah Anak Terbantu</h3>
              <p className="text-2xl font-bold">{laporanData.jumlahAnak}</p>
            </div>
            <div className="bg-[#493953] text-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium">Jumlah Penyalur</h3>
              <p className="text-2xl font-bold">{laporanData.jumlahPenyalur}</p>
            </div>
          </div>

          {/* Grafik */}
          <div className="bg-gray-200 p-4 rounded-lg shadow mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Total Donasi Per Bulan</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataPerBulan}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis tickFormatter={(value) => value / 1000000 + " jt"} />
                <Tooltip formatter={(value) => formatRupiah(value)} />
                <Bar dataKey="jumlah" fill="#493953" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tombol Lanjut */}
          <div className="flex justify-right">
            <button
              onClick={() => navigate("/laporan/datapenyaluran")}
              className="inline-flex items-center px-6 py-2 bg-[#5C457E] hover:bg-[#47366e] text-white rounded-lg transition"
            >
              Lanjut →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Laporan;
