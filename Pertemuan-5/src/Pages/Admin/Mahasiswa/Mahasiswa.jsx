import { useState, useEffect } from "react";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { mahasiswaList } from "@/Data/Dummy";

const Mahasiswa = () => {
  const [data, setData] = useState(() => {
    // Ambil data dari localStorage jika ada, jika tidak gunakan dummy data
    const saved = localStorage.getItem("mahasiswa");
    return saved ? JSON.parse(saved) : mahasiswaList;
  });

  useEffect(() => {
    localStorage.setItem("mahasiswa", JSON.stringify(data));
  }, [data]);

  const [form, setForm] = useState(null); // { mode: "add" | "edit", nim, nama }
  const [error, setError] = useState("");

  const openAdd = () => {
    setError("");
    setForm({ mode: "add", nim: "", nama: "" });
  };

  const openEdit = (mhs) => {
    setError("");
    setForm({ mode: "edit", ...mhs });
  };

  const closeForm = () => setForm(null);

  const handleDelete = (nim, nama) => {
    if (confirm(`Yakin ingin hapus ${nama}?`)) {
      setData((prev) => prev.filter((mhs) => mhs.nim !== nim));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const nim = form.nim.trim();
    const nama = form.nama.trim();

    if (form.mode === "add") {
      if (data.some((mhs) => mhs.nim === nim)) {
        setError("NIM sudah terdaftar!");
        return;
      }
      setData((prev) => [...prev, { nim, nama }]);
    } else {
      setData((prev) => prev.map((mhs) => (mhs.nim === nim ? { ...mhs, nama } : mhs)));
    }
    closeForm();
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">
          Daftar Mahasiswa
        </Heading>
        <Button onClick={openAdd}>+ Tambah Mahasiswa</Button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mhs, index) => (
            <tr key={mhs.nim} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.nama}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <a href={`/admin/mahasiswa/${mhs.nim}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
                  Detail
                </a>
                <Button size="sm" variant="warning" onClick={() => openEdit(mhs)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(mhs.nim, mhs.nama)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {form && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSave} className="bg-white rounded-lg p-6 w-96 space-y-4">
            <h3 className="text-lg font-semibold">{form.mode === "add" ? "Tambah Mahasiswa" : "Edit Mahasiswa"}</h3>

            <div>
              <label className="block text-sm mb-1">NIM</label>
              <input value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })} disabled={form.mode === "edit"} required className="w-full border rounded px-3 py-2 disabled:bg-gray-100" />
              {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Nama</label>
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required className="w-full border rounded px-3 py-2" />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={closeForm}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </div>
      )}
    </Card>
  );
};

export default Mahasiswa;
