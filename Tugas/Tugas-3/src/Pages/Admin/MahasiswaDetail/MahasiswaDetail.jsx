import { useParams } from "react-router-dom";

import Heading from "@/Components/atoms/Heading";
import Card from "@/Components/molecules/Card";

import { mahasiswaList } from "@/Data/Dummy";

const MahasiswaDetail = () => {
  const { nim } = useParams();

  // Baca dari localStorage dulu, kalau kosong baru pakai data dummy
  const saved = localStorage.getItem("mahasiswa");
  const list = saved ? JSON.parse(saved) : mahasiswaList;

  const mahasiswa = list.find((m) => m.nim === nim);

  if (!mahasiswa) {
    return <p className="text-red-600">Data mahasiswa tidak ditemukan.</p>;
  }

  return (
    <Card>
      <Heading as="h2" align="left" className="mb-4">
        Detail Mahasiswa
      </Heading>
      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">NIM</td>
            <td className="py-2 px-4">{mahasiswa.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MahasiswaDetail;
