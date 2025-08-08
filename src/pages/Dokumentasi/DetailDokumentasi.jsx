import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../utils/axios";
import Artikel1 from "../../assets/Artikel1.png";

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

// const dataPenyaluran = [
//   {
//     id: 1,
//     tanggal: "30-06-2025",
//     namaAnak: "Arello Mahesa Kynan",
//     nominal: 2206500,
//     penyalur: "Admin 1",
//     target: 3000000,
//   },
//   {
//     id: 2,
//     tanggal: "30-06-2025",
//     namaAnak: "Putri Nadira Ayu",
//     nominal: 1500000,
//     penyalur: "Admin 2",
//     target: 2500000,
//   },
//   {
//     id: 3,
//     tanggal: "29-06-2025",
//     namaAnak: "Fahri Rizqullah",
//     nominal: 1000000,
//     penyalur: "Admin 3",
//     target: 1500000,
//   },
// ];

const DetailDokumentasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null)

    useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`http://192.168.100.129/api/dokumentasi`); // endpoint backend kamu
        setData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setData(null);
      }
    };

    getData();
  }, [id]);

  if (!data) {
    return <p className="p-6">Data tidak ditemukan.</p>;
  }

  const persentase = Math.round((data.nominal / data.target) * 100);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-[#111827] font-raleway">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 max-w-4xl mx-auto w-full">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Kembali
          </button>

          <div className="bg-white shadow-md rounded-lg p-6">
            <img
              src={Artikel1}
              alt="Dokumentasi"
              className="w-full h-64 object-cover rounded-md mb-6"
            />
            <h1 className="text-2xl font-bold mb-2">{data.namaAnak}</h1>
            <p className="text-sm text-gray-600 mb-2">Tanggal: {data.tanggal}</p>
            <p className="text-sm text-gray-600 mb-2">Penyalur: {data.penyalur}</p>
            <p className="text-sm text-gray-600 mb-2">
              Tersalurkan: Rp{parseInt(data.nominal).toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Target: Rp{parseInt(data.target).toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600 mb-2">Persentase: {persentase}%</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailDokumentasi;
