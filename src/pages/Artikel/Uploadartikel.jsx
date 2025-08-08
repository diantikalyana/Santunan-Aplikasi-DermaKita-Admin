import React, { useState } from "react";
import axios from "../../utils/axios";
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

const UploadArtikel = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      if (form.image) formData.append("image", form.image);

      await axios.post("/artikel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Artikel berhasil diunggah!");
      navigate("/artikel");
    } catch (error) {
      console.error("Gagal upload artikel:", error);
      alert("Gagal mengunggah artikel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-[#111827] font-raleway">
      <style>{fontStyle}</style>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-[#493953]">Upload Artikel</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-100"
          >
            <div>
              <label className="block text-sm font-semibold mb-2">Judul Artikel</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8673A1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Deskripsi Singkat</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows="2"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8673A1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Isi Artikel</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows="6"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8673A1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Upload Gambar</label>

              <div className="flex items-center space-x-4">
                <input
                  id="upload-image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <label
                  htmlFor="upload-image"
                  className="inline-block bg-[#8673A1] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#6e5c8a] transition-all duration-150"
                >
                  Pilih Gambar
                </label>

                {form.image && (
                  <span className="text-sm text-gray-600 italic truncate max-w-[200px]">
                    {form.image.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#8673A1] text-white px-6 py-2 rounded-lg shadow hover:bg-[#6e5c8a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                {isSubmitting ? "Mengunggah..." : "Unggah Artikel"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UploadArtikel;
