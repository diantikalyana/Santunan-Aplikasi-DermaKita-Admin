import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const dokumentasiData = [
  {
    id: 1,
    tanggal: "2025-08-01",
    lokasi: "Desa Sugihan",
    nominal: "Rp 10.000.000",
    metode: "Bank Syariah Indonesia",
    rekening: 3,
    keterangan:
      "Dana sebesar 10 juta telah ditasarufkan melalui Bank Syariah Indonesia ke 3 rekening anak yatim di Desa Sugihan.",
    foto: "/images/dokumentasi1.jpg",
  },
  {
    id: 2,
    tanggal: "2025-08-03",
    lokasi: "Desa Sidowangi",
    nominal: "Rp 7.500.000",
    metode: "Bank Syariah Indonesia",
    rekening: 2,
    keterangan:
      "Donasi senilai 7,5 juta ditransfer ke 2 rekening penerima di Desa Sidowangi untuk kebutuhan pendidikan.",
    foto: "/images/dokumentasi2.jpg",
  },
  {
    id: 3,
    tanggal: "2025-08-04",
    lokasi: "Desa Sangen",
    nominal: "Rp 5.000.000",
    metode: "Bank Syariah Indonesia",
    rekening: 1,
    keterangan:
      "Penyaluran dana sebesar 5 juta telah dilakukan ke 1 rekening anak yatim di Desa Sangen melalui transfer bank.",
    foto: "/images/dokumentasi3.jpg",
  },
];

const DokumentasiUmum = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#f5f5f5] min-h-screen">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Dokumentasi Umum
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dokumentasiData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all duration-300"
              >
                <img
                  src={item.foto}
                  alt={`Dokumentasi ${item.lokasi}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-sm text-gray-500 mb-1">{item.tanggal}</p>
                <h2 className="text-lg font-bold text-gray-700 mb-1">
                  {item.lokasi}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Nominal:</strong> {item.nominal}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Metode:</strong> {item.metode}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Jumlah Rekening:</strong> {item.rekening}
                </p>
                <p className="text-gray-700 mt-2">{item.keterangan}</p>
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
        </div>
      </div>
    </div>
  );
};

export default DokumentasiUmum;
