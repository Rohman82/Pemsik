import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@/Components/atoms/Button";
import Heading from "@/Components/atoms/Heading";
import Card from "@/Components/molecules/Card";
import Form from "@/Components/organisms/Form";
import Modal from "@/Components/organisms/Modal";

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

  const [modal, setModal] = useState(null); // { mode: "add" | "edit", nim, nama }
  const [error, setError] = useState("");

  const openAdd = () => {
    setError("");
    setModal({ mode: "add", nim: "", nama: "" });
  };

  const openEdit = (mhs) => {
    setError("");
    setModal({ mode: "edit", ...mhs });
  };

  const closeModal = () => setModal(null);

  const handleDelete = (nim, nama) => {
    if (confirm(`Yakin ingin hapus ${nama}?`)) {
      setData((prev) => prev.filter((mhs) => mhs.nim !== nim));
    }
  };

  const handleSave = (values) => {
    const nim = values.nim.trim();
    const nama = values.nama.trim();

    if (modal.mode === "add") {
      if (data.some((mhs) => mhs.nim === nim)) {
        setError("NIM sudah terdaftar!");
        return;
      }
      setData((prev) => [...prev, { nim, nama }]);
    } else {
      setData((prev) => prev.map((mhs) => (mhs.nim === nim ? { ...mhs, nama } : mhs)));
    }
    closeModal();
  };

  const fields = [
    { name: "nim", label: "NIM", disabled: modal?.mode === "edit" },
    { name: "nama", label: "Nama" },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" align="left" className="mb-0">
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
                <Link to={`/admin/mahasiswa/${mhs.nim}`} className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-3 py-1 rounded-lg">
                  Detail
                </Link>
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

      <Modal open={modal !== null} title={modal?.mode === "add" ? "Tambah Mahasiswa" : "Edit Mahasiswa"} onClose={closeModal}>
        {modal && (
          <Form
            fields={fields}
            initialValues={modal}
            errors={{ nim: error }}
            onSubmit={handleSave}
            actions={
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit">Simpan</Button>
              </div>
            }
          />
        )}
      </Modal>
    </Card>
  );
};

export default Mahasiswa;
