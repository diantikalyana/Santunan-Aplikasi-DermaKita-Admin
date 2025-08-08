import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Notifikasi from "./pages/Notifikasi";
import ProfileAdmin from "./pages/ProfileAdmin";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/data-anak-yatim/Detail";
import Donasi from "./pages/Donasi";
import Detailanak from "./pages/data-anak-yatim/Detailanak";
import Editdetailanak from "./pages/data-anak-yatim/Editdetailanak";
import Pengajuan from "./pages/data-anak-yatim/Pengajuan";
import PengajuanDetail from "./pages/data-anak-yatim/PengajuanDetail";
import Laporan from "./pages/Laporan/Laporan";
import Datapenyaluran from "./pages/Laporan/Datapenyaluran";
import Rekappenyaluran from "./pages/Laporan/Rekappenyaluran";
import DataAdmin from "./pages/DataAdmin";
import Editdataadmin from "./pages/Editdataadmin";
import Artikel from "./pages/Artikel/Artikel";
import DetailArtikel from "./pages/Artikel/DetailArtikel";
import EditArtikel from "./pages/Artikel/EditArtikel";
import Uploadartikel from "./pages/Artikel/Uploadartikel";  
import Dokumentasi from "./pages/Dokumentasi/Dokumentasi";
import DokumentasiUmum from "./pages/Dokumentasi/DokumentasiUmum";
import DokumentasiKhusus from "./pages/Dokumentasi/DokumentasiKhusus";
import DetailDokumentasi from "./pages/Dokumentasi/Detaildokumentasi";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notifikasi" element={<Notifikasi />} />
       <Route path="/profileadmin" element={<ProfileAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-anak-yatim" element={<Detail />} />
        <Route path="/donasi" element={<Donasi />} />
        <Route path="/data-anak-yatim/detailanak/:id" element={<Detailanak />} />
        <Route path="/data-anak-yatim/Editdetailanak/:id" element={<Editdetailanak />} />
        <Route path="/data-anak-yatim/pengajuan" element={<Pengajuan />} />
        <Route path="/data-anak-yatim/pengajuandetail/:id" element={<PengajuanDetail />} />
        <Route path="/laporan" element={<Laporan />} />
      <Route path="/laporan/datapenyaluran" element={<Datapenyaluran />} />

        <Route path="/laporan/rekappenyaluran/:id" element={<Rekappenyaluran />} />
        <Route path="/dataadmin" element={<DataAdmin />} />
        <Route path="/dataadmin/edit/:id" element={<Editdataadmin />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/:id" element={<DetailArtikel />} />
        <Route path="/artikel/edit/:id" element={<EditArtikel />} />
        <Route path="/artikel/upload" element={<Uploadartikel />} /> 
        <Route path="/dokumentasi" element={<Dokumentasi />} />
        <Route path="/dokumentasi/dokumentasiumum" element={<DokumentasiUmum />} />
       <Route path="/dokumentasi/dokumentasikhusus" element={<DokumentasiKhusus />} />
        <Route path="/detaildokumentasi/:id" element={<DetailDokumentasi />} />
      </Routes>
    </Router>
  );
};

export default App;
