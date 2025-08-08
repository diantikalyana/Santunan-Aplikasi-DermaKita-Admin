import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Editdataadmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dummyData = {
    id: 1,
    username: "Admin_01",
    password: "12345678",
    status: "Aktif",
    lastLogin: "12:30:52, 12 Desember 2025",
  };

  const [formData, setFormData] = useState(dummyData);

  useEffect(() => {
    
    setFormData(dummyData);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Admin disimpan:", formData);
    alert("Perubahan data admin berhasil disimpan!");
    navigate(`/data-admin/detail/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-[#493953] mb-4 text-center">
        Edit Data Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          >
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Login</label>
          <input
            type="text"
            name="lastLogin"
            value={formData.lastLogin}
            disabled
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate(`/DataAdmin/${id}`)}
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

export default Editdataadmin;
