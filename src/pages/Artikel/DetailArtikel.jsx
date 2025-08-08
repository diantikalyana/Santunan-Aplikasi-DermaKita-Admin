import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FiEdit, FiTrash } from "react-icons/fi";
import Artikel1 from "../../assets/Artikel1.png";
import Artikel2 from "../../assets/Artikel2.png";

// dummy data awal
const dummyArtikelList = [
  {
    id: 1,
    title: "Bantu Alif Melawan Kanker",
    date: "01 Agustus 2025",
    image: Artikel1,
    content: `Alif, 7 tahun, anak yatim yang menderita kanker darah. Ia sangat membutuhkan bantuan dana untuk menjalani pengobatan intensif di rumah sakit dengan total kebutuhan Rp50.000.000.

Kegiatan penggalangan dana ini menjadi bentuk nyata kepedulian kita terhadap masa depan anak-anak yang tengah berjuang menghadapi penyakit berat. 

Dengan bantuanmu, Alif memiliki harapan untuk sembuh dan kembali menjalani masa kecilnya seperti anak-anak lainnya. Mari menjadi bagian dari harapan dan kesembuhan Alif.`,
    terkumpul: 30000000,
    target: 50000000,
  },
  {
    id: 2,
    title: "Bantu Hanum yang Terbaring Lemah",
    date: "03 Agustus 2025",
    image: Artikel2,
    content: `Hanum adalah anak yatim berusia 9 tahun yang sedang sakit keras dan membutuhkan uluran tangan kita semua untuk biaya pengobatan sebesar Rp20.000.000.

Setiap rupiah dari kebaikanmu akan menjadi napas baru baginya, menjadi bukti bahwa ia tidak berjuang sendirian. 

Mari bersama-sama menyalakan kembali semangat hidup dalam tubuh kecilnya yang kini terbaring lemah.`,
    terkumpul: 18000000,
    target: 20000000,
  },
];

const DetailArtikel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikelList, setArtikelList] = useState(dummyArtikelList);
  const [comments, setComments] = useState([
    { id: 1, name: "Park Joengseong", content: "Terima kasih, Aku merasa lebih bersyukur" },
    { id: 2, name: "Lee Heeseung", content: "Acaranya sangat menginspirasi 😍" },
  ]);
  const [newComment, setNewComment] = useState("");

  const artikel = artikelList.find((item) => item.id === parseInt(id));

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newItem = {
      id: Date.now(),
      name: "Istri Jay",
      content: newComment,
    };
    setComments([...comments, newItem]);
    setNewComment("");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Yakin ingin menghapus artikel ini?");
    if (confirmDelete) {
      const updatedList = artikelList.filter((item) => item.id !== parseInt(id));
      setArtikelList(updatedList);
      alert("Artikel berhasil dihapus.");
      navigate("/artikel");
    }
  };

  const handleEdit = () => {
    navigate(`/artikel/edit/${id}`);
  };

  if (!artikel) return <div className="p-4">Artikel tidak ditemukan.</div>;

  const persentase = Math.min(Math.round((artikel.terkumpul / artikel.target) * 100), 100);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-[#111827] font-raleway">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 max-w-3xl mx-auto w-full">
          <div className="bg-white shadow rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-2 text-[#493953]">{artikel.title}</h1>
            <p className="text-sm text-gray-500 mb-4">Tanggal: {artikel.date}</p>
            <img
              src={artikel.image}
              alt="Artikel"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line">
              {artikel.content}
            </p>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r  from-[#ae9dc2] via-[#b998ec] to-[#c2dfeb]"
                  style={{ width: `${persentase}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-gray-600">
                <span>Terkumpul: Rp{artikel.terkumpul.toLocaleString("id-ID")}</span>
                <span>Target: Rp{artikel.target.toLocaleString("id-ID")}</span>
              </div>
              <div className="mt-4">
                <button
                  disabled
                  className="px-3 py-1 bg-gradient-to-b from-[#bd8ddb] to-[#a86bce] text-white font-semibold rounded-full text-xs shadow-sm cursor-default"
                >
                  {persentase}% Tercapai
                </button>
              </div>
            </div>

            {/* Spasi sebelum tombol */}
            <div className="mt-6 flex gap-4">
              {/* Box Edit */}
              <div
                className="flex items-center gap-2 bg-[#f2eaff] border border-[#cbbfe3] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e4d9f5]"
                onClick={() => navigate(`/artikel/editartikel/${id}`)}
              >
                <FiEdit size={20} className="text-[#5C457E]" />
                <span className="text-sm font-medium text-[#493953]">Edit Artikel</span>
              </div>

              {/* Box Delete */}
              <div
                className="flex items-center gap-2 bg-[#ffeaea] border border-[#e3bcbc] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#fbd2d2]"
                onClick={handleDelete}
              >
                <FiTrash size={20} className="text-[#5C457E]" />
                <span className="text-sm font-medium text-[#493953]">Hapus Artikel</span>
              </div>
            </div>
          </div>

          {/* Komentar */}
          <div className="bg-white shadow mt-6 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#493953]">Komentar</h2>

            <div className="space-y-4 mb-4">
              {comments.map((komentar) => (
                <div key={komentar.id} className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm font-semibold text-[#493953]">{komentar.name}</p>
                  <p className="text-sm text-gray-700">{komentar.content}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={handleAddComment}
                className="bg-[#8673A1] hover:bg-[#6e5c8a] text-white px-4 py-2 rounded-lg text-sm"
              >
                Kirim
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/artikel')}
                className="bg-[#584763] hover:bg-[#9f7db6] text-white px-4 py-2 rounded shadow"
              >
                ← Kembali
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailArtikel;
