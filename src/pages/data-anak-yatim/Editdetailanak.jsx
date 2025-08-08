import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editdetailanak = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnakById = async () => {
      try {
        const response = await axios.get(`/api/anak/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data anak:", error);
        alert("Gagal mengambil data anak. Pastikan ID valid.");
        navigate("/data-anak-yatim");
      } finally {
        setLoading(false);
      }
    };
    fetchAnakById();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/anak/${id}`, formData);
      alert("Perubahan data anak berhasil disimpan!");
      navigate(`/data-anak-yatim/detailanak/${id}`);
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;
  if (!formData) return <div className="p-6 text-red-600">Data tidak ditemukan.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-[#493953] mb-4 text-center">
        Edit Data Anak
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Anak</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nama Wali</label>
          <input
            type="text"
            name="namaWali"
            value={formData.namaWali}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nama Pendamping</label>
          <input
            type="text"
            name="namaPendamping"
            value={formData.namaPendamping}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">No. Telp</label>
          <input
            type="text"
            name="telp"
            value={formData.telp}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">No. Rekening</label>
          <input
            type="text"
            name="rekening"
            value={formData.rekening}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tempat & Tanggal Lahir</label>
          <input
            type="text"
            name="tempatTanggalLahir"
            value={formData.tempatTanggalLahir}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Jenis Kelamin</label>
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Keterangan</label>
          <input
            type="text"
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate(`/data-anak-yatim/detailanak/${id}`)}
            className="bg-[#493953] text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#493953] text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editdetailanak;
