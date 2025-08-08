import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios from "../../utils/axios"; // ⬅️ Axios backend
import Artikel1 from "../../assets/Artikel1.png";

const EditArtikel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data artikel dari backend
  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const res = await axios.get(`/artikel/${id}`);
        const artikel = res.data;

        setTitle(artikel.judul || "");
        setDate(artikel.created_at?.split("T")[0] || ""); // atau pakai tanggal khusus
        setContent(artikel.text || "");
        setPreview(`https://192.168.103.162:8000/storage/${artikel.foto}`);
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
        alert("Artikel tidak ditemukan atau gagal dimuat.");
        navigate("/artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("judul", title);
      formData.append("text", content);
      if (image) formData.append("foto", image);

      await axios.post(`/artikel/update/${id}`, formData); // pastikan sesuai endpoint backend
      alert("Artikel berhasil diperbarui.");
      navigate("/artikel");
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Gagal menyimpan artikel.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      try {
        await axios.delete(`/artikel/${id}`);
        alert("Artikel berhasil dihapus.");
        navigate("/artikel");
      } catch (err) {
        console.error("Gagal menghapus:", err);
        alert("Gagal menghapus artikel.");
      }
    }
  };

  if (loading) return <div className="p-4">Memuat artikel...</div>;

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-[#111827] font-raleway">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 max-w-3xl mx-auto w-full">
          <div className="bg-white shadow rounded-xl p-6 space-y-4">
            <h1 className="text-xl font-bold text-[#493953]">Edit Artikel</h1>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Judul</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Tanggal</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Konten</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Gambar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-full h-64 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="bg-[#6d4e9e] hover:bg-[#5c3f89] text-white px-4 py-2 rounded-lg text-sm"
              >
                Simpan
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Hapus
              </button>
              <button
                onClick={() => navigate("/artikel")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm"
              >
                ← Batal
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditArtikel;
