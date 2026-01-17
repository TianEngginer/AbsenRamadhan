const MAX_HARI = 30;

// Ambil data dari LocalStorage atau buat baru
let dataRamadhan = JSON.parse(localStorage.getItem("ramadhanData")) || {
    nama: "",
    puasa: Array(MAX_HARI + 1).fill(false),
    tarawih: Array(MAX_HARI + 1).fill(false)
};

// Load nama otomatis
document.getElementById("nama").value = dataRamadhan.nama;

function simpanAbsen() {
    let nama = document.getElementById("nama").value;
    let hari = parseInt(document.getElementById("hari").value);
    let p = document.getElementById("puasa").value;
    let t = document.getElementById("tarawih").value;

    if (!nama || !hari || hari < 1 || hari > 30 || p === "" || t === "") {
        alert("Lengkapi semua data!");
        return;
    }

    dataRamadhan.nama = nama;
    dataRamadhan.puasa[hari] = (p === "ya");
    dataRamadhan.tarawih[hari] = (t === "ya");

    localStorage.setItem("ramadhanData", JSON.stringify(dataRamadhan));

    alert("✅ Absen hari ke-" + hari + " tersimpan permanen");
}

function lihatRekap() {
    let totalPuasa = dataRamadhan.puasa.filter(Boolean).length;
    let totalTarawih = dataRamadhan.tarawih.filter(Boolean).length;
    let pahala = (totalPuasa * 10) + (totalTarawih * 5);

    document.getElementById("rekap").innerHTML = `
        <b>📊 Rekap Ramadhan</b><br>
        Nama: ${dataRamadhan.nama}<br>
        Puasa: ${totalPuasa} hari<br>
        Tarawih: ${totalTarawih} malam<br>
        Pahala dan Social Credit: ${pahala}
    `;
}

function resetData() {
    if (confirm("⚠ Yakin ingin menghapus seluruh data Ramadhan?")) {
        localStorage.removeItem("ramadhanData");
        location.reload();
    }
}