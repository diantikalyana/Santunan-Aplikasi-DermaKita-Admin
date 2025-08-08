import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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
  body, .font-raleway {
    font-family: 'Raleway', sans-serif;
  }
`;

const dummyAdmins = [
  {
    id: 0,
    username: "Admin_01",
    password: "12345678",
    status: "Aktif",
    lastLogin: "12:30:52, 12 Desember 2025",
  },
  {
    id: 1,
    username: "Admin_02",
    password: "87654321",
    status: "Aktif",
    lastLogin: "09:30:52, 12 Desember 2025",
  },
];

const DataAdmin = () => {
  const [admins, setAdmins] = useState(dummyAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setFormData({ username: admin.username, password: admin.password });
  };

  const handleCloseModal = () => {
    setSelectedAdmin(null);
  };

  const handleSaveChanges = () => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === selectedAdmin.id
          ? { ...admin, username: formData.username, password: formData.password }
          : admin
      )
    );
    handleCloseModal();
  };

  return (
    <div className="flex min-h-screen bg-white font-raleway relative">
      <style>{fontStyle}</style>

      <Sidebar />

      <div className="flex flex-col flex-1 relative">
        <Navbar />

        <main className="p-6 bg-[#f5f5f5] overflow-y-auto relative z-10">
          <div className="bg-gray-200 rounded-xl p-6 shadow-md max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#493953] mb-6">Data Admin</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="text-sm text-gray-700 mb-4 space-y-1">
                    <p><span className="font-semibold">Username:</span> {admin.username}</p>
                    <p><span className="font-semibold">Password:</span> {admin.password}</p>
                    <p><span className="font-semibold">Status:</span> {admin.status}</p>
                    <p><span className="font-semibold">Last Login:</span> {admin.lastLogin}</p>
                  </div>
                  <button
                    onClick={() => handleEditClick(admin)}
                    title="Edit data admin"
                    className="mt-2 bg-gradient-to-r from-[#8673A1] to-[#A084CA] text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
                  >
                    <FiEdit size={16} />
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Modal Edit */}
        {selectedAdmin && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90vw] max-w-md border border-purple-300">
              <h3 className="text-xl font-semibold mb-4 text-[#493953] text-center">Edit Admin</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <input
                    type="text"
                    value={selectedAdmin.status}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-gradient-to-r from-[#8673A1] to-[#A084CA] text-white rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataAdmin;
