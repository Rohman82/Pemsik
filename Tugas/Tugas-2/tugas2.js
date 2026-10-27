// ===== ALAT BANTU (rumus nilai) =====
// Nilai akhir 1 mata kuliah = tugas 30% + UTS 30% + UAS 40% (ganti kalau dosen minta lain)
const nilaiAkhir = (mk) => mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;

// Nilai angka -> huruf
const hurufNilai = (n) =>
  n >= 85 ? "A" : n >= 70 ? "B" : n >= 55 ? "C" : n >= 40 ? "D" : "E";

const bobotHuruf = { A: 4, B: 3, C: 2, D: 1, E: 0 };

// ===== BAGIAN 1: OBJEK MAHASISWA =====
const mahasiswa = {
  data: [
    { nim: "A003", nama: "Citra", aktif: true,
      matkul: [{ nama: "Web", sks: 3, tugas: 90, uts: 85, uas: 88 },
               { nama: "Basis Data", sks: 2, tugas: 80, uts: 75, uas: 70 }] },
    { nim: "A001", nama: "Budi", aktif: false,
      matkul: [{ nama: "Web", sks: 3, tugas: 60, uts: 55, uas: 50 },
               { nama: "Basis Data", sks: 2, tugas: 70, uts: 65, uas: 60 }] },
    { nim: "A002", nama: "Dewi", aktif: true,
      matkul: [{ nama: "Web", sks: 3, tugas: 75, uts: 70, uas: 80 },
               { nama: "Basis Data", sks: 2, tugas: 85, uts: 90, uas: 95 }] },
  ],

  // Tampilkan semua mahasiswa
  show() {
    console.table(this.data.map((m) => ({ nim: m.nim, nama: m.nama, aktif: m.aktif })));
  },

  // Tambah mahasiswa baru
  add(mhs) {
    this.data.push(mhs);
  },

  // Ubah data mahasiswa berdasarkan NIM
  update(nim, dataBaru) {
    const mhs = this.data.find((m) => m.nim === nim);
    if (mhs) Object.assign(mhs, dataBaru);
  },

  // Hapus mahasiswa berdasarkan NIM
  deleteById(nim) {
    this.data = this.data.filter((m) => m.nim !== nim);
  },

  // Total nilai: rata-rata nilai akhir semua mata kuliah mahasiswa itu
  totalNilai(nim) {
    const mhs = this.data.find((m) => m.nim === nim);
    const jumlah = mhs.matkul.reduce((total, mk) => total + nilaiAkhir(mk), 0);
    return jumlah / mhs.matkul.length;
  },

  // Kategori nilai (A/B/C/D/E)
  kategoriNilai(nim) {
    return hurufNilai(this.totalNilai(nim));
  },

  // IPS = jumlah (bobot huruf x SKS) / jumlah SKS
  IPS(nim) {
    const mhs = this.data.find((m) => m.nim === nim);
    let poin = 0, sks = 0;
    for (const mk of mhs.matkul) {
      poin += bobotHuruf[hurufNilai(nilaiAkhir(mk))] * mk.sks;
      sks += mk.sks;
    }
    return poin / sks;
  },

  // Hapus semua mahasiswa
  clear() {
    this.data = [];
  },
};

// ===== BAGIAN 2: ARRAY OF OBJECT =====
const jumlahMahasiswa = (arr) => arr.length;

const sortByNIM = (arr) => [...arr].sort((a, b) => a.nim.localeCompare(b.nim));

// Yang aktif di atas, yang tidak aktif di bawah
const sortByStatus = (arr) => [...arr].sort((a, b) => Number(b.aktif) - Number(a.aktif));

const jumlahAktifTidak = (arr) => ({
  aktif: arr.filter((m) => m.aktif).length,
  tidakAktif: arr.filter((m) => !m.aktif).length,
});

const clearArray = (arr) => { arr.length = 0; };

// ===== COBA JALANKAN =====
mahasiswa.show();
mahasiswa.add({ nim: "A004", nama: "Eko", aktif: true,
  matkul: [{ nama: "Web", sks: 3, tugas: 70, uts: 60, uas: 65 }] });
mahasiswa.update("A001", { aktif: true });
mahasiswa.deleteById("A004");

console.log("Total nilai Citra:", mahasiswa.totalNilai("A003"));
console.log("Kategori Citra:", mahasiswa.kategoriNilai("A003"));
console.log("IPS Citra:", mahasiswa.IPS("A003"));

console.log("Jumlah mahasiswa:", jumlahMahasiswa(mahasiswa.data));
console.log("Urut NIM:", sortByNIM(mahasiswa.data).map((m) => m.nim));
console.log("Urut status:", sortByStatus(mahasiswa.data).map((m) => m.nama));
console.log("Aktif/tidak:", jumlahAktifTidak(mahasiswa.data));

clearArray(mahasiswa.data);
console.log("Setelah dikosongkan:", mahasiswa.data.length);
