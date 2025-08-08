import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
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

const Pengajuan = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.100.129:8000/api/pengajuan-anak");
        setData(response.data);
      } catch (error) {
        console.error("Gagal fetch data pengajuan:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen font-raleway">
      <style>{fontStyle}</style>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white">
        <Navbar showNotif={data.length > 0} />

        <main className="p-6 flex-1">
          <div className="bg-[#493953] text-white px-6 py-4 rounded-lg shadow mb-6 w-fit">
            <h1 className="text-lg font-semibold">Data Pengajuan Verifikasi</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left bg-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-bold border-b border-[#493953]">
                <tr className="px-6">
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Nama Lengkap</th>
                  <th className="px-4 py-3">Tempat, Tanggal Lahir</th>
                  <th className="px-4 py-3">Alamat</th>
                  <th className="px-4 py-3">Wali</th>
                  <th className="px-4 py-3">Operasi</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {data.map((anak, index) => (
                  <tr
                    key={anak.id}
                    className="hover:bg-gray-400 transition cursor-pointer"
                    onClick={() => navigate(`/data-anak-yatim/PengajuanDetail/${anak.id}`)}
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{anak.nama_anak}</td>
                    <td className="px-4 py-3">
                      {anak.tempat_lahir}, {anak.tanggal_lahir}
                    </td>
                    <td className="px-4 py-3">{anak.alamat || "-"}</td>
                    <td className="px-4 py-3">{anak.nama_wali || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#493953] text-white">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tombol Kembali */}
          <div className="mt-6 flex justify-right">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#493953] hover:bg-[#776781] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md active:scale-105"
            >
              ← Kembali
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pengajuan;
