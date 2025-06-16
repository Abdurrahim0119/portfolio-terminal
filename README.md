# Portfolio Terminal Interaktif v1.0

Sebuah portofolio web yang mensimulasikan pengalaman menggunakan *command-line interface* (CLI) dengan estetika retro dan nuansa *hacker*.

![Screenshot Portofolio](https://i.imgur.com/your-screenshot-code.png)
*(Ganti link di atas dengan link screenshot portofolio Anda. Anda bisa mengunggah gambar Anda ke imgur.com untuk mendapatkan link)*

---

### **[➡️ Lihat Live Demo](https://abdurrahim0119.github.io/Portfolio_CMD/)** *(Ganti URL ini dengan link GitHub Pages Anda setelah di-deploy)*

---

## Tentang Proyek Ini

Bosan dengan portofolio web standar yang membosankan? Proyek ini adalah sebuah eksplorasi dalam menciptakan pengalaman pengguna yang unik dan berkesan. Pengunjung tidak hanya melihat informasi, tetapi juga berinteraksi dengannya melalui perintah-perintah teks, seolah-olah mereka sedang mengakses sebuah sistem operasi pribadi.

Proyek ini dibangun dari awal menggunakan Vanilla JavaScript untuk menunjukkan pemahaman mendalam tentang manipulasi DOM, event handling, dan logika aplikasi, tanpa bergantung pada framework JavaScript yang besar.

## Fitur Unggulan

- **🖥️ UI Terminal Realistis:** Tampilan yang dirancang untuk meniru terminal modern dengan prompt gaya Kali Linux.
- **🚀 Animasi Booting:** Efek animasi "booting system" saat pertama kali halaman dimuat untuk pengalaman yang imersif.
- **⌨️ Efek Animasi Ketikan:** Semua output dari perintah ditampilkan dengan efek ketikan untuk meniru respons terminal asli.
- **📁 Sistem File Palsu:** Simulasi direktori dan file yang bisa dijelajahi menggunakan perintah `ls`, `cat`, dan `cd`.
- **✨ Perintah Fundamental Linux:** Implementasi perintah-perintah ikonik seperti `whoami`, `pwd`, `history`, `echo`, `clear`, dan `date`.
- **🔗 Perintah Fungsional `open`:** Kemampuan untuk membuka tautan eksternal (seperti profil LinkedIn dan GitHub) langsung dari terminal.
- **📱 Desain Sepenuhnya Responsif:** Tampilan, logo, dan konten secara otomatis menyesuaikan diri untuk pengalaman terbaik di semua perangkat, dari desktop hingga mobile.

## Teknologi yang Digunakan

* **HTML5**
* **Tailwind CSS (via CDN)** - Untuk styling cepat dan responsif.
* **Vanilla JavaScript (ES6+)** - Untuk semua logika, interaktivitas, dan manipulasi DOM.

## Cara Menjalankan Secara Lokal

Karena proyek ini tidak memiliki dependensi atau proses build yang rumit, Anda bisa menjalankannya dengan sangat mudah:

1.  **Clone repository ini:**
    ```sh
    git clone [https://github.com/Abdurrahim0119/Portfolio_CMD.git](https://github.com/Abdurrahim0119/Portfolio_CMD.git)
    ```
2.  **Buka file `index.html`** langsung di browser Anda. Selesai!

## Daftar Perintah yang Tersedia

| Perintah | Deskripsi |
| :--- | :--- |
| `help` | Menampilkan pesan bantuan ini. |
| `ls` | Menampilkan daftar file dan direktori. |
| `cat [file]` | Membaca isi dari sebuah file. |
| `cd [dir]` | Berpindah direktori. Gunakan `cd ..` untuk kembali. |
| `whoami` | Menampilkan nama user saat ini (`guest`). |
| `pwd` | Menampilkan path direktori Anda saat ini. |
| `history` | Menampilkan riwayat perintah yang telah diketik. |
| `echo [teks]` | Menampilkan kembali teks yang Anda berikan. |
| `open [site]` | Membuka tautan. `site` bisa berupa `linkedin` atau `github`. |
| `clear` | Membersihkan seluruh isi layar terminal. |
| `date` | Menampilkan tanggal dan waktu saat ini. |

---

<p align="center">
  Copyright &copy; 2024-2025 Abdurrahim. All Rights Reserved.
</p>

## Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.