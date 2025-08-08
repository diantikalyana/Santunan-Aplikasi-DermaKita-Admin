import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Riwayat from '@/pages/data-anak-yatim/Detail'; 
import Detailanak from '@/pages/data-anak-yatim/Detailanak';
import Pengajuan from '@/pages/data-anak-yatim/Pengajuan';
import Login from './pages/Login'; 
import Donasi from './pages/Donasi';
import ProtectedRoute from './components/ProtectedRoute'; 
import Laporan from './pages/Laporan'; 
import DataAdmin from './pages/Dataadmin';
import Artikel from './pages/Artikel/Artikel';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/data-anak-yatim/detailanak/:id" // ✔️ path diperbaiki: Detaianak → detailanak
          element={
            <ProtectedRoute>
              <Detailanak />
            </ProtectedRoute>
          }
        />

        <Route
          path="/data-anak-yatim/pengajuan"
          element={
            <ProtectedRoute>
              <Pengajuan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/data-anak-yatim/detail/:id" // ✔️ path fix: dataanakyatim → data-anak-yatim, Detail → detail
          element={
            <ProtectedRoute>
              <Riwayat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donasi"
          element={
            <ProtectedRoute>
              <Donasi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laporan"
          element={
            <ProtectedRoute>
              <Laporan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dataadmin"
          element={
            <ProtectedRoute>
              <DataAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artikel"
          element={
            <ProtectedRoute>
              <Artikel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
