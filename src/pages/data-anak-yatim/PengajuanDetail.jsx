import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Alertmodal from "../../components/Modal/Alertmodal";

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

const PengajuanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anak, setAnak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    onConfirm: () => {},
  });
  const [resultModal, setResultModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fontStyle;
    document.head.appendChild(style);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.100.129:8000/api/pengajuan-anak/${id}`);
        setAnak(response.data);
      } catch (error) {
        console.error("Gagal fetch data anak:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!anak) return <div>Data tidak ditemukan</div>;

  const handleVerifikasi = () => {
    setModalConfig({
      title: "Verifikasi Data",
      message: `Yakin ingin memverifikasi data anak atas nama ${anak.nama_anak}?`,
      confirmText: "Verifikasi",
      onConfirm: () => {
        setShowModal(false);
        setResultModal({
          isOpen: true,
          title: "Berhasil Diverifikasi",
          message: `Data anak atas nama ${anak.nama_anak} telah berhasil diverifikasi.`,
        });
      },
    });
    setShowModal(true);
  };

  const handleTolak = () => {
    setModalConfig({
      title: "Tolak Data",
      message: `Yakin ingin menolak data anak atas nama ${anak.nama_anak}?`,
      confirmText: "Tolak",
      onConfirm: () => {
        setShowModal(false);
        setResultModal({
          isOpen: true,
          title: "Data Ditolak",
          message: `Data anak atas nama ${anak.nama_anak} telah ditolak dan dikembalikan ke pengaju.`,
        });
      },
    });
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen font-raleway">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white-100">
        <Navbar />
        <main className="p-6">
          <div className="bg-gray-200 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#5C457E]">Pengajuan Anak Yatim</h2>
              <div className="flex gap-3">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow"
                  onClick={handleVerifikasi}
                >
                  Verifikasi
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow"
                  onClick={handleTolak}
                >
                  Tolak
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="text-sm w-full font-raleway">
                <tbody>
                  <tr><td className="py-2 w-1/4">Nama Pendamping</td><td className="py-2">{anak.nama_pendamping}</td></tr>
                  <tr><td className="py-2">Nama Wali</td><td className="py-2">{anak.nama_wali}</td></tr>
                  <tr><td className="py-2">No Telepon Pengaju</td><td className="py-2">{anak.no_pengaju}</td></tr>
                  <tr><td className="py-2">Nama Pengaju</td><td className="py-2">{anak.nama_pengaju}</td></tr>
                  <tr><td className="py-2">Nama Anak</td><td className="py-2">{anak.nama_anak}</td></tr>
                  <tr><td className="py-2">Tempat, Tanggal Lahir</td><td className="py-2">{anak.tempat_lahir}, {anak.tanggal_lahir}</td></tr>
                  <tr><td className="py-2">Jenis Kelamin</td><td className="py-2">{anak.jenis_kelamin}</td></tr>
                  <tr><td className="py-2">Status</td><td className="py-2">{anak.status}</td></tr>
                  <tr><td className="py-2">Alamat</td><td className="py-2">{anak.alamat}</td></tr>
                  <tr>
                    <td className="py-2">Kartu Keluarga</td>
                    <td className="py-2">
                      <a href={anak.foto_kk} target="_blank" rel="noopener noreferrer" className="italic underline text-blue-500 hover:text-blue-700">Open File</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Surat Kematian</td>
                    <td className="py-2">
                      <a href={anak.surat_kematian} target="_blank" rel="noopener noreferrer" className="italic underline text-blue-500 hover:text-blue-700">Open File</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-[#584763] hover:bg-[#9f7db6] text-white px-4 py-2 rounded shadow"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Konfirmasi */}
      <Alertmodal
        isOpen={showModal}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setShowModal(false)}
      />

      {/* Modal Hasil Verifikasi/Penolakan */}
      <Alertmodal
        isOpen={resultModal.isOpen}
        title={resultModal.title}
        message={resultModal.message}
        confirmText="OK"
        onConfirm={() => {
          setResultModal({ ...resultModal, isOpen: false });
          navigate(-1);
        }}
        onClose={() => {
          setResultModal({ ...resultModal, isOpen: false });
          navigate(-1);
        }}
      />
    </div>
  );
};

export default PengajuanDetail;
