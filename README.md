<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ruang Obat 🌿
> **Media Edukasi Informasi Obat dan Farmasi Klinis Berbasis AI**  
> *Tugas Akhir Berbasis Proyek — Program Studi S1 Farmasi Klinis dan Komunitas, Institut Kesehatan Widya Dharma Husada Tangerang (Versi 2026)*

---

## 👥 Tim Pengembang
* **Andika Bella Pratama Putra** (NIM: 231030790839)
* **Nur Abdullah Kholiq** (NIM: 231030790829)
* **Syahrul Ramdhani** (NIM: 231030791114)

---

## 🌟 Fitur Utama Platform

1. **Cek Label Obat (Golongan & Simbol Resmi):**  
   Mengenali arti lingkaran hijau (Obat Bebas), biru (Bebas Terbatas dengan P.No. 1–6), merah lingkaran K (Obat Keras), Narkotika, Jamu, OHT, dan Fitofarmaka sesuai standar BPOM RI.
2. **Lemari Obat Keluarga & Pengingat Kedaluwarsa:**  
   Pencatatan obat rumah tangga dengan sistem pemantauan batas masa simpan (*Beyond Use Date* / BUD vs *Expired Date* / ED) dan status keamanan stok.
3. **Panduan Simpan & Buang Obat (Prinsip DAGUSIBU):**  
   Edukasi cara penyimpanan dan pemusnahan obat yang rusak/kedaluwarsa agar tidak mencemari lingkungan atau disalahgunakan.
4. **Latihan Pemahaman Literasi Obat:**  
   Kartu uji mandiri dan simulasi kasus untuk menguji pemahaman aturan pakai, rute pemberian, dan rambu-rambu keamanan pasien.
5. **Pustaka Resmi & Asisten AI Farmasi Klinis:**  
   Chatbot edukasi cerdas berbasis Google Gemini yang terintegrasi dan mengutip ketat bab rujukan dari **35 berkas pustaka resmi** (Buku Ajar Farmakologi HKI 2022 & Farmakologi dan Terapi FKUI Edisi 4).

---

## 💻 Cara Menjalankan Proyek di Komputer Lokal

### Prasyarat
* [Node.js](https://nodejs.org/) (versi 18 ke atas) atau [Bun](https://bun.sh/)
* Google Gemini API Key

### Langkah Menjalankan
1. **Clone repositori:**
   ```bash
   git clone https://github.com/snowypalter/KALARMA-OBAT.git
   cd KALARMA-OBAT
   ```

2. **Install dependensi:**
   ```bash
   npm install
   # atau pakai bun:
   bun install
   ```

3. **Atur API Key:**
   Buat file `.env` di root folder proyek dan isi dengan:
   ```env
   GEMINI_API_KEY=api_key_gemini_anda_di_sini
   ```

4. **Jalankan aplikasi:**
   ```bash
   npm run dev
   # atau pakai bun:
   bun run dev
   ```
   Buka browser di `http://localhost:3000`.

---

## ⚠️ Pemberitahuan Edukasi (Medical Disclaimer)
Ruang Obat adalah media edukasi informasi obat dan farmasi klinis. Informasi yang disediakan di platform ini bertujuan untuk literasi kesehatan dan **tidak menggantikan saran, diagnosis, atau resep dari dokter maupun apoteker**. Hindari swamedikasi obat keras tanpa resep resmi.

---
© 2026 Ruang Obat · Farmasi Klinis dan Komunitas · Institut Kesehatan Widya Dharma Husada Tangerang