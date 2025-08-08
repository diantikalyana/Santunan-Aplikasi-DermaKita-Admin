import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
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

const DetailAnak = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anak, setAnak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fontStyle;
    document.head.appendChild(style);

    // fetch detail anak dari API
    const fetchAnak = async () => {
      try {
        const response = await axios.get(`/api/anak/${id}`);
        setAnak(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail anak:", error);
        setAnak(null); // set null jika error
      } finally {
        setLoading(false);
      }
    };

    fetchAnak();

    return () => {
      document.head.removeChild(style);
    };
  }, [id]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/anak/${id}`);
      setShowDeleteModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/data-anak-yatim");
      }, 2000);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
      setShowDeleteModal(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Memuat data...</div>;
  if (!anak) return <div className="p-6 text-red-600">Data tidak ditemukan</div>;

  return (
    <div className="flex min-h-screen font-raleway">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white-100">
        <Navbar />
        <main className="p-6">
          <div className="bg-gray-200 rounded-xl shadow p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#5C457E]">
                Detail Data Terverifikasi
              </h2>
              <div className="flex gap-3 text-[#5C457E]">
                <button
                  className="hover:text-white"
                  title="Edit"
                  onClick={() => navigate(`/data-anak-yatim/Editdetailanak/${id}`)}
                >
                  <FiEdit size={20} />
                </button>
                <button
                  className="hover:text-white"
                  title="Hapus"
                  onClick={handleDelete}
                >
                  <FiTrash size={20} />
                </button>
              </div>
            </div>

            <table className="text-sm w-full font-raleway">
              <tbody>
                <tr><td className="py-2 w-1/4">Nama Pendamping</td><td className="py-2">{anak.nama_pendamping}</td></tr>
                <tr><td className="py-2">Nama Wali</td><td className="py-2">{anak.nama_wali}</td></tr>
                <tr><td className="py-2">No Telepon Pendamping/Wali</td><td className="py-2">{anak.telp}</td></tr>
                <tr><td className="py-2">No Rekening</td><td className="py-2">{anak.rekening}</td></tr>
                <tr><td className="py-2">Nama Anak</td><td className="py-2">{anak.nama_anak}</td></tr>
                <tr><td className="py-2">Tempat, Tanggal Lahir</td><td className="py-2">{anak.tempat_tanggal_lahir}</td></tr>
                <tr><td className="py-2">Jenis Kelamin</td><td className="py-2">{anak.jenis_kelamin}</td></tr>
                <tr><td className="py-2">Keterangan</td><td className="py-2">{anak.keterangan}</td></tr>
                <tr><td className="py-2">Alamat</td><td className="py-2">{anak.alamat}</td></tr>
                <tr>
                  <td className="py-2">Kartu Keluarga</td>
                  <td className="py-2">
                    <a
                      href={anak.kartu_keluarga}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="italic underline text-blue-500 hover:text-blue-700"
                    >
                      Open File
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Surat Kematian</td>
                  <td className="py-2">
                    <a
                      href={anak.surat_kematian}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="italic underline text-blue-500 hover:text-blue-700"
                    >
                      Open File
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6">
              <button
                onClick={() => navigate(`/data-anak-yatim`)}
                className="bg-[#493953] hover:bg-[#836f8f] text-white px-4 py-2 rounded shadow"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </main>
      </div>

      <Alertmodal
        isOpen={showDeleteModal}
        title="Hapus Data"
        message={`Yakin ingin menghapus data atas nama ${anak.nama_anak}?`}
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={confirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />

      <Alertmodal
        isOpen={showSuccessModal}
        title="Data Terhapus"
        message={`Data atas nama ${anak.nama_anak} berhasil dihapus.`}
        confirmText="OK"
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate("/data-anak-yatim");
        }}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default DetailAnak;
