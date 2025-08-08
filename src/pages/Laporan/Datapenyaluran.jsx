import React, { useEffect, useState } from "react";
import axios from "axios";
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

const DataPenyaluran = () => {
  const navigate = useNavigate();
  const [dataPenyaluran, setDataPenyaluran] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.100.129:8000/api/rekap-penyalur");
        setDataPenyaluran(response.data);
      } catch (error) {
        console.error("Gagal mengambil data penyaluran:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (item) => {
    navigate(`/laporan/rekappenyaluran/${item.id}`, { state: item });
  };

  const handleLihatFoto = (e, fotoUrl) => {
    e.stopPropagation();
    window.open(fotoUrl, "_blank");
  };

  return (
    <div className="flex min-h-screen font-raleway bg-white text-gray-800">
      <style>{fontStyle}</style>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-auto">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-xl font-bold text-white bg-[#493953] px-6 py-2 rounded-lg">
              Data Penyaluran
            </h1>
          </div>

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div className="rounded-xl overflow-hidden shadow-md">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-[#493953] font-semibold">
                  <tr>
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Donasi Masuk</th>
                    <th className="px-4 py-3">Donasi Keluar</th>
                    <th className="px-4 py-3">Penyalur</th>
                    <th className="px-4 py-3">No Rekening</th>
                    <th className="px-4 py-3">Bukti Tasaruf</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPenyaluran.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.tanggal}</td>
                      <td className="px-4 py-3">{item.donasi_masuk}</td>
                      <td className="px-4 py-3">{item.donasi_keluar}</td>
                      <td className="px-4 py-3">{item.nama_penyalur}</td>
                      <td className="px-4 py-3">{item.no_rekening}</td>
                      <td className="px-4 py-3">
                        <button
                          className="bg-[#8673A1] hover:bg-[#6e5c8a] text-white text-xs px-4 py-2 rounded-lg shadow-sm transition"
                          onClick={(e) => handleLihatFoto(e, item.fotoUrl)}
                        >
                          Lihat Foto
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => navigate("/laporan")}
              className="bg-[#493953] hover:bg-[#836f8f] text-white px-4 py-2 rounded shadow"
            >
              ← Kembali
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataPenyaluran;
