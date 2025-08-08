import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FiCheckCircle } from "react-icons/fi";

// Font injection (optional)
const fontStyle = `
  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-Regular.woff2') format('woff2');
    font-weight: 400;
  }
  .font-raleway {
    font-family: 'Raleway', sans-serif;
  }
`;

// Data penyaluran khusus anak urgensi
const dataPenyaluran = [
  {
    id: 1,
    tanggal: "2025-06-30",
    namaAnak: "Bayu Pratama",
    desa: "Desa Sugihan",
    nominal: 10000000,
    target: 10000000,
    penyalur: ["Vina Widianti", "Risky Maulana"],
    keterangan:
      "Dana sebesar 10 juta telah berhasil ditasarufkan melalui transfer langsung ke rekening atas nama Bayu Pratama di Desa Sugihan untuk pengobatan sakit gigi akut yang masuk dalam kategori urgensi.",
    foto: "/images/bayu.jpg",
  },
  {
    id: 2,
    tanggal: "2025-07-02",
    namaAnak: "Anisa Rahma",
    desa: "Desa Sangen",
    nominal: 5000000,
    target: 5000000,
    penyalur: ["Tinah Aulia"],
    keterangan:
      "Penyaluran dana sebesar 5 juta telah dilakukan kepada Anisa Rahma di Desa Sangen melalui transfer untuk kebutuhan operasi mata mendesak.",
    foto: "/images/anisa.jpg",
  },
  {
    id: 3,
    tanggal: "2025-07-05",
    namaAnak: "Ilham Maulana",
    desa: "Desa Sidowangi",
    nominal: 7500000,
    target: 7500000,
    penyalur: ["Vina Widianti", "Almira Nuranisa"],
    keterangan:
      "Ilham Maulana dari Desa Sidowangi menerima bantuan dana senilai 7,5 juta untuk pengobatan TBC yang ditasarufkan langsung ke rekeningnya oleh relawan.",
    foto: "/images/ilham.jpg",
  },
];

const DokumentasiKhusus = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-[#111827] font-raleway">
      <style>{fontStyle}</style>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 max-w-6xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#493953] mb-6">Dokumentasi Penyaluran Khusus</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataPenyaluran.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/detaildokumentasi/${item.id}`)}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={item.foto}
                  alt={`Dokumentasi ${item.namaAnak}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-sm text-gray-600 mb-1">Tanggal: {item.tanggal}</p>
                <h2 className="text-lg font-semibold text-[#493953] mb-1">
                  {item.namaAnak} - {item.desa}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Penyalur: {item.penyalur.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Target Donasi: Rp{item.target.toLocaleString("id-ID")}
                </p>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                    <FiCheckCircle className="text-green-600" />
                    Tersalurkan: Rp{item.nominal.toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{item.keterangan}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
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

export default DokumentasiKhusus;
