// 1. Seleksi elemen HTML dan simpan ke variabel
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");
const totalTugas = document.getElementById("total-tugas");
const tugasSelesai = document.getElementById("tugas-selesai");
const tugasBelum = document.getElementById("tugas-belum");

// 2. Fungsi untuk memperbarui angka statistik
function perbaruiStatistik() {
  // jumlah semua <li> di dalam daftar
  const jumlahTotal = daftarTugas.children.length;
  // jumlah tugas yang punya class "completed"
  const jumlahSelesai = daftarTugas.querySelectorAll(".completed").length;
  // sisanya adalah tugas yang belum selesai
  const jumlahBelum = jumlahTotal - jumlahSelesai;

  totalTugas.innerText = jumlahTotal;
  tugasSelesai.innerText = jumlahSelesai;
  tugasBelum.innerText = jumlahBelum;
}

// 3. Fungsi untuk menambah tugas baru
function tambahTugas() {
  // ambil teks dari input, trim() menghapus spasi di awal dan akhir
  const teks = inputTugas.value.trim();

  // validasi: jika kosong, tampilkan peringatan dan berhenti
  if (teks === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  // buat elemen <li> baru
  const itemBaru = document.createElement("li");

  // buat <span> untuk teks tugas
  const teksTugas = document.createElement("span");
  teksTugas.innerText = teks;

  // jika teks diklik, tandai selesai / batalkan selesai
  teksTugas.addEventListener("click", function () {
    teksTugas.classList.toggle("completed");
    perbaruiStatistik();
  });

  // buat tombol hapus
  const btnHapus = document.createElement("button");
  btnHapus.innerText = "Hapus";
  btnHapus.className = "btn-hapus";

  // jika tombol hapus diklik, hapus <li> lalu perbarui statistik
  btnHapus.addEventListener("click", function () {
    itemBaru.remove();
    perbaruiStatistik();
  });

  // masukkan span dan tombol ke dalam <li>, lalu <li> ke dalam <ul>
  itemBaru.appendChild(teksTugas);
  itemBaru.appendChild(btnHapus);
  daftarTugas.appendChild(itemBaru);

  // kosongkan input dan perbarui statistik
  inputTugas.value = "";
  perbaruiStatistik();
}

// 4. Tambah tugas saat tombol "Tambah" diklik
btnTambah.addEventListener("click", function () {
  tambahTugas();
});

// 5. Tambah tugas saat tombol Enter ditekan di kolom input
inputTugas.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    tambahTugas();
  }
});