import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaMoneyBillWave } from 'react-icons/fa';
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

const DonasiAdmin = () => {
  const [donasiData, setDonasiData] = useState([]);
  const [tanggal, setTanggal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.100.129:8000/api/donasi", {
          timeout: 20000,
        });
        setDonasiData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data donasi:", error);
        setDonasiData([]); 
      }
    };

    fetchData();

    const now = new Date();
    const formatted = now.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
    setTanggal(formatted);
  }, []);

  const totalDonasi = donasiData.reduce((acc, curr) => acc + (curr.Nominal || 0), 0);

  return (
    <div className="flex min-h-screen font-raleway">
      <style>{fontStyle}</style>

      <Sidebar />

      <div className="flex-1 flex flex-col bg-white-100">
        <Navbar />

        <main className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#493953] p-4 rounded-xl shadow flex items-center gap-4">
              <FaMoneyBillWave className="text-3xl text-white" />
              <div>
                <p className="text-sm text-white">Total Donasi Masuk Bulan Ini</p>
                <p className="text-xl font-bold text-white">Rp {totalDonasi.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left bg-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm border-b border-white">
                <tr>
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Donatur</th>
                  <th className="px-4 py-3">Nominal</th>
                  <th className="px-4 py-3">Metode</th>
                  <th className="px-4 py-3">Jenis Donasi</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {donasiData.map((donasi, index) => (
                  <tr key={donasi.id || index}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{donasi.tanggal}</td>
                    <td className="px-4 py-3">{donasi.nama_donasi}</td>
                    <td className="px-4 py-3">Rp {donasi.nominal?.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3">{donasi.metode}</td>
                    <td className="px-4 py-3">{donasi["jenis_donasi"]}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${donasi.status === 'Sukses'
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-400 text-gray-900'}`}>
                        {donasi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonasiAdmin;
