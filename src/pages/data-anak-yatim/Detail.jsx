import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
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

const StatusBadge = ({ status }) => {
  let colorClass = "";

  if (status === "Aktif") {
    colorClass = "bg-green-500";
  } else if (status === "Tidak Aktif") {
    colorClass = "bg-yellow-500";
  } else {
    colorClass = "bg-gray-500";
  }

  return (
    <span className={`text-white text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

const Detail = () => {
  const navigate = useNavigate();
  const [dataAnakYatim, setDataAnakYatim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleClick = (id) => {
    navigate(`/data-anak-yatim/Detailanak/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.100.129:8000/api/anak");

        if (Array.isArray(res.data)) {
          setDataAnakYatim(res.data);
        } else if (Array.isArray(res.data.data)) {
          setDataAnakYatim(res.data.data);
        } else {
          throw new Error("Data yang diterima bukan array.");
        }
      } catch (err) {
        setError("Gagal mengambil data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen font-raleway">
      <style>{fontStyle}</style>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white-100">
        <Navbar />
        <main className="p-4">
          <div className="bg-[#493953] text-white p-6 w-full max-w-xs rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold">Cek & Verifikasi Data</h2>
            <p className="text-sm text-gray-200">Perlu peninjauan</p>
          </div>

          {/* Loading / Error / Table */}
          {loading ? (
            <p className="text-blue-500">Memuat data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : dataAnakYatim.length === 0 ? (
            <p className="text-gray-500">Data tidak tersedia.</p>
          ) : (
            <div className="overflow-hidden shadow rounded-lg">
              <table className="w-full table-auto text-sm bg-gray-200">
                <thead className="bg-gray-100 text-gray-700 border-b border-[#6e6574] px-6">
                  <tr className="px-6">
                    <th className="py-3 px-4 text-left">No.</th>
                    <th className="py-3 px-4 text-left">Nama Lengkap</th>
                    <th className="py-3 px-4 text-left">Tempat, Tanggal Lahir</th>
                    <th className="py-3 px-4 text-left">Alamat</th>
                    <th className="py-3 px-4 text-left">Wali</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAnakYatim.map((anak, index) => (
                    <tr
                      key={anak.id || index}
                      onClick={() => handleClick(anak.id)}
                      className="hover:bg-gray-400 cursor-pointer"
                    >
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{anak.nama_lengkap}</td>
                      <td className="py-2 px-4">{anak.tempat_TanggalLahir}</td>
                      <td className="py-2 px-4">{anak.alamat}</td>
                      <td className="py-2 px-4">{anak.wali}</td>
                      <td className="py-2 px-4">
                        <StatusBadge status={anak.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tombol Lanjut */}
          <div className="mt-6">
            <button
              className="bg-[#493953] text-white text-bold px-4 py-2 rounded hover:bg-[#4a3767] transition-all duration-300 ease-in-out shadow-md active:scale-105"
              onClick={() => navigate("/data-anak-yatim/Pengajuan")}
            >
              Lanjut →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Detail;
