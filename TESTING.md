# Panduan uji — Genesis Studio

Apa saja yang bisa kamu coba sekarang, apa yang seharusnya terjadi, dan apa yang
memang **belum** jalan supaya tidak dilaporkan sebagai bug.

Semuanya berjalan di komputermu. Tidak ada yang menyentuh internet kecuali harga
crypto di halaman depan.

---

## 0. Persiapan (sekali saja)

```bash
npm install
```

```bash
npm run db:migrate
```

Membuat `data/genesis.db` dan mengisinya dengan 10 artikel. Aman diulang — kalau
sudah ada isinya, seed dilewati dan tulisanmu tidak tertimpa.

Lalu buat akunmu sendiri. **Ganti password ini** — yang sekarang hanya untuk
pengujian saya:

```bash
ADMIN_EMAIL=redaksi@genesisnetwork.id ADMIN_PASSWORD='pilih-yang-panjang' npm run db:admin
```

Jalankan servernya:

```bash
npm run dev
```

Buka **http://localhost:3000/admin**

---

## 1. Keamanan — yang seharusnya GAGAL

Uji ini sama pentingnya dengan yang berhasil.

| Langkah | Harusnya |
| --- | --- |
| Buka `/admin` tanpa login | Dilempar ke `/admin/login` |
| Login dengan password salah | *"Email atau password salah."* |
| Login dengan email yang tidak ada | Pesan **sama persis** — tidak boleh membocorkan email mana yang terdaftar |
| Buka `/api/articles` langsung di browser (belum login) | `{"error":"unauthorized"}` |
| Setelah login, ketik `document.cookie` di Console | Cookie sesi **tidak muncul** — memang disembunyikan dari JavaScript |
| Klik **Keluar**, lalu tekan tombol Back | Tidak bisa kembali ke Studio |

---

## 2. Daftar artikel

- Ketik di kotak cari — coba judul, kata dari deck, atau tag seperti `Tesla`
- Klik tab **Draft** — harusnya 2 artikel
- Ganti kategori ke **Saham**
- Gabungkan filter sampai tidak ada hasil → muncul *"Tidak ada artikel yang cocok"*
  dan tombol **Hapus semua filter**
- Ubah urutan: Terakhir diubah / Tanggal terbit / Judul A–Z
- Perkecil jendela ke lebar HP — tabel harus tetap terbaca, tanpa geser ke samping

---

## 3. Menulis dan menyimpan

1. Klik **Tulis artikel** → artikel baru muncul sebagai draft
2. Ubah judul → perhatikan **slug ikut berubah otomatis** di bawahnya
3. Isi deck, pilih kategori dan seri, tambahkan tag
4. Klik **Simpan draft** → muncul *"Draft tersimpan."*
5. **Refresh halaman** → perubahanmu masih ada

Langkah 5 itu intinya. Kalau bertahan setelah refresh, berarti benar-benar masuk
database, bukan cuma tersimpan di layar.

### Aturan slug yang sengaja dibuat begitu

1. Pada artikel **draft**, ubah judul → slug ikut berubah
2. Klik **Terbitkan**
3. Ubah judulnya lagi → **slug tidak berubah**

Ini disengaja. Setelah terbit, mengubah slug akan merusak semua tautan yang sudah
tersebar.

---

## 4. Blok isi artikel

Tombol **+ Tambah blok** menawarkan enam tipe. Coba satu per satu:

| Blok | Yang perlu dicek |
| --- | --- |
| Paragraf | Ketik teks panjang — **kotaknya memanjang ke bawah**, teks tidak terpotong |
| Subjudul | Satu baris |
| Kutipan | Kalimat + sumber opsional |
| Daftar | Tambah dan hapus poin satuan |
| Angka | Tiga isian: nilai, label, catatan |
| Gambar | Pilih dari pustaka, isi alt text dan keterangan |

Juga: tombol **↑ ↓** untuk memindah urutan, dan **×** untuk menghapus blok.

### Tautan di tengah kalimat

Di dalam blok paragraf, tulis:

```
Menurut [Binance](https://binance.com), agen AI akan jadi **pengguna terbesar**
stablecoin. Lihat juga [artikel kami](/artikel/apa-itu-tokenized-stocks).
```

Lalu buka **Pratinjau**. Yang harus terjadi:

- "Binance" jadi tautan biru, terbuka di **tab baru**
- "artikel kami" jadi tautan, tetap di **tab yang sama**
- "pengguna terbesar" jadi **tebal**

---

## 5. Pratinjau

Klik **Pratinjau** di kanan atas.

- Artikel tampil persis seperti yang akan dilihat pembaca — memakai komponen yang
  sama dengan halaman artikel publik, bukan tiruan terpisah
- Kalau statusnya draft, ada penanda *"belum tayang untuk pembaca"*
- Tekan **Esc** untuk menutup

---

## 6. Menghapus

Klik **Hapus artikel** di paling bawah sidebar → muncul konfirmasi → artikel
hilang dari daftar. Refresh untuk memastikan benar-benar hilang.

Buat artikel percobaan dulu sebelum mencoba ini.

---

## 7. Membuktikan datanya benar-benar tersimpan

Kalau ingin melihat isi database langsung:

```bash
node -e "const{createClient}=require('@libsql/client');createClient({url:'file:./data/genesis.db'}).execute('SELECT title,status,updated_at FROM articles ORDER BY updated_at DESC LIMIT 5').then(r=>console.table(r.rows))"
```

Judul yang baru kamu ubah harus muncul di baris paling atas.

---

## 8. Form partnership dan Leads

Buka `http://localhost:3000/partnership`, gulir ke bawah ke form.

| Langkah | Yang harus terjadi |
| --- | --- |
| Isi Nama, Brand, Email, pilih jenis kerja sama, tulis pesan | Penghitung karakter di bawah kolom pesan ikut naik, berhenti di 700 |
| Klik **Lanjut ke WhatsApp** | Tab baru terbuka ke WhatsApp dengan pesan sudah tersusun rapi — **belum terkirim**, kamu yang menekan kirim |
| Kembali ke tab situs | Muncul panel "WhatsApp sudah dibuka" dengan tautan cadangan kalau tabnya diblokir |
| Buka Studio → tab **Leads** | Pengajuan tadi sudah ada di sana, ditandai **Baru** |

Yang penting dipahami: **leadnya tercatat saat form dikirim, bukan saat pesan
WhatsApp terkirim.** Jadi kalau orangnya berubah pikiran dan tidak menekan kirim,
datanya tetap ada di Studio.

Di tab Leads, klik satu baris untuk membukanya: email bisa diklik, nomor WhatsApp
(kalau diisi) langsung membuka chat ke orang itu, dan status bisa diubah jadi
Dihubungi / Deal / Arsip.

**Tombol "Chat langsung"** di bawah form untuk orang yang malas isi apa pun —
langsung buka WhatsApp tanpa lewat database.

> Di situs GitHub Pages, tombol WhatsApp tetap jalan tapi leadnya **tidak
> tersimpan** — situs statis tidak punya tempat menyimpan. Pencatatan baru
> hidup setelah situs dipindah ke host yang punya server.

---

## Yang BELUM jalan — jangan dilaporkan sebagai bug

| | Keterangan |
| --- | --- |
| **Unggah gambar** | Pustaka media masih daftar tetap dari 14 artwork lama. Tombol "Ganti gambar" belum bisa mengunggah file. |
| **Tab Riset, Media, Tim** | Masih rangka — belum bisa diklik. Yang jalan baru Artikel dan Leads. |
| **Tambah pengguna** | Hanya lewat terminal (`npm run db:admin`). |
| **Riwayat versi** | Belum ada. Menyimpan menimpa yang lama. |
| **Belum online** | Hanya jalan saat `npm run dev` di komputermu. Rekan tim belum bisa ikut menulis, dan lead dari situs yang sudah live belum tercatat. |

---

## Kalau ada yang aneh

Yang paling berguna untuk saya: **apa yang kamu lakukan, apa yang kamu harapkan,
apa yang terjadi.** Kalau ada pesan merah di Console browser (F12), salin juga.
