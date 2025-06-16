document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const input = document.getElementById("terminal-input");
  const outputContainer = document.getElementById("terminal-output");
  const outputLog = document.getElementById("terminal-output"); // ini tempat elemen ditambahkan
  const promptElement = document.getElementById("prompt");

  // State variables
  let commandHistory = [];
  let historyIndex = -1;
  let isTyping = false;
  let currentPath = ["~"];

  // File system structure (unchanged from your original)
  const fileSystem = {
    "~": {
      "help.txt": `+------------------------------------------------------+
| BANTUAN - Perintah yang Tersedia                       |
|------------------------------------------------------|
| help       - Menampilkan pesan bantuan ini         |
| ls         - Menampilkan daftar file dan direktori |
| cat [file] - Menampilkan isi dari sebuah file      |
| cd [dir]   - Berpindah direktori ('cd ..' u/ kembali)|
| whoami     - Menampilkan user saat ini             |
| pwd        - Menampilkan path direktori saat ini   |
| history    - Menampilkan riwayat perintah          |
| echo [text]- Menampilkan kembali teks yang diberikan|
| open [site]- Membuka tautan (linkedin/github)      |
| clear      - Membersihkan layar terminal           |
| date       - Menampilkan tanggal dan waktu         |
+------------------------------------------------------+`,
      "help_mobile.txt": `Perintah Umum:
- help         : Bantuan
- ls           : Daftar file
- cat [file]   : Buka file
- cd [dir]     : Masuk folder
- whoami       : Lihat user
- pwd          : Path saat ini
- open [site]  : Buka github/linkedin
- clear        : Bersihkan terminal`,
      "about.txt": `Halo, saya Abdurrahim.
Seorang web developer yang antusias dalam membangun antarmuka interaktif dan estetis, 
dengan sentuhan terminal dan tema hacking.

Saya memiliki ketertarikan khusus pada animasi berbasis kode, 
terminal palsu yang realistis, serta pengembangan front-end modern dengan sentuhan retro.

Portofolio ini saya buat sebagai proyek pribadi untuk menunjukkan keterampilan saya
dalam JavaScript, Tailwind CSS, dan interaktivitas DOM.`,
      "skills.txt": `
🔧 KETERAMPILAN TEKNIS
----------------------------------
- Bahasa Pemrograman:
    JavaScript (ES6+), PHP, HTML5, CSS3

- Frameworks & Libraries:
    React.js, Laravel, CodeIgniter,
    Tailwind CSS, Bootstrap

- Tools & Platform:
    Git, GitHub, Docker, Figma

🎨 FOKUS UTAMA
----------------------------------
- Simulasi Terminal Interaktif
- Animasi UI & Interaksi Mikro
- Pengembangan Front-End Kreatif

🚀 SEDANG DIPELAJARI
----------------------------------
- Pengembangan Fullstack (MERN/LAMP)
- Three.js untuk Web 3D
- Framer Motion untuk Advanced Animation

💼 KETERAMPILAN NON-TEKNIS
----------------------------------
- Komunikasi Teknis & Presentasi
- Manajemen Waktu & Proyek
- Kolaborasi Tim (Teamwork)
- Pemecahan Masalah (Problem-Solving)`,
      "socialmedia.txt": `🔗 Media Sosial:
- GitHub   : https://github.com/Abdurrahim0119
- LinkedIn : https://linkedin.com/in/abdurrahim-rahim
- Instagram: https://instagram.com/dedee0119
- Email    : abdurrahim011902@gmail.com

Ketik: open github / open linkedin`,
      "portfolio.txt": `
📂 BEBERAPA PROYEK SAYA
----------------------------------

1. PORTFOLIO TERMINAL (Proyek Saat Ini)
   Deskripsi : Sebuah portofolio interaktif yang mensimulasikan pengalaman
               menggunakan command-line interface (CLI).
   Teknologi : HTML, Tailwind CSS, Vanilla JavaScript (ES6+), DOM Manipulation.
   Tautan    : Code: https://github.com/Abdurrahim0119/Portfolio_CMD

2. 3D ISLAND (React Three Fiber)
   Deskripsi : Eksplorasi pembuatan scene 3D interaktif di dalam web browser
               menggunakan ekosistem React.
   Teknologi : React, Three.js (React Three Fiber), Framer Motion, Tailwind CSS.
   Tautan    : View: https://island3-d.vercel.app/ | Code: https://github.com/Abdurrahim0119/Island3D

3. BPJS E-LEARNING (Framework Development)
   Deskripsi : Membangun sebuah framework PHP dari dasar dengan mengimplementasikan
               pola desain Model-View-Controller (MVC) untuk platform e-learning.
   Teknologi : PHP, Bootstrap, SCSS, JavaScript, MySQL.
   Tautan    : [Silakan tambahkan link jika ada]

4. ZYNRAH SHOP (E-Commerce)
   Deskripsi : Aplikasi e-commerce sederhana untuk penjualan produk, dibangun
               menggunakan PHP native.
   Teknologi : PHP, Bootstrap, HTML, MySQL.
   Tautan    : Code: https://github.com/Abdurrahim0119/Zynrah

5. WEB CV (Static Site)
   Deskripsi : Sebuah halaman CV online yang bersih, elegan, dan responsif.
               Dibangun sepenuhnya dengan dasar-dasar web.
   Teknologi : HTML, CSS.
   Tautan    : View: https://abdurrahim0119.github.io/PortofolioCurriculumVita.github.io
`,
      "intership.txt": `💼 Pengalaman Magang:

Graha BPJSTK Jamsostek (2025)
Posisi : Infrastruktur Bidang TI

Tugas:
- Perapihan Dokumen
- Pencatatan Arsip
- Pengkatagorian Dokumen
- Pencatatan Arsip 
- Membuat Visual Dashboard 

Hasil:
- Kontribusi pada 2 proyek internal
- Meningkatkan skill Network dan Operasional `,
      proyek: {
        "portfolio.txt":
          "Proyek ini adalah portofolio interaktif berbasis terminal.\nDibuat dengan HTML, Tailwind CSS, dan JavaScript.\nMeniru pengalaman terminal hacking dengan sentuhan personal.",
      },
    },
  };
  // Helper functions
  function getCurrentDirectory() {
    let current = fileSystem;
    for (const dir of currentPath) {
      current = current[dir];
    }
    return current;
  }

  // Display functions
  function appendOutput(content, className = "") {
    const outputLine = document.createElement("div");
    outputLine.className = `pre-text ${className}`;
    outputLine.innerHTML = content;
    document.getElementById("terminal-output").appendChild(outputLine);
    outputContainer.scrollTop = outputContainer.scrollHeight;
    scrollToBottom();
  }

  function typeWriter(text, className = "", onComplete) {
    isTyping = true;
    input.disabled = true;
    let i = 0;
    const speed = text.length > 200 ? 1 : 15; // Ketik cepat untuk ASCII art
    const outputLine = document.createElement("div");
    outputLine.className = `pre-text ${className}`;
    outputContainer.appendChild(outputLine);

    function type() {
      if (i < text.length) {
        // Menggunakan innerHTML agar tag <span> bisa dirender
        outputLine.innerHTML += text.charAt(i);
        i++;
        outputContainer.scrollTop = outputContainer.scrollHeight;
        setTimeout(type, speed);
      } else {
        isTyping = false;
        input.disabled = false;
        input.focus();
        if (onComplete) onComplete();
      }
    }
    type();
  }

  function showCommandProcessing(callback) {
    const line = document.createElement("div");
    line.className = "pre-text processing";
    outputContainer.appendChild(line);

    const frames = ["⠁", "⠂", "⠄", "⠂"];
    let i = 0;

    let interval = setInterval(() => {
      line.innerHTML = `Start processing to search.... ${frames[i % frames.length]}`;
      i++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      line.remove();
      callback(); // lanjutkan eksekusi command
    }, 600);
  }
  // Command execution
  function executeCommand(command) {
    if (!command.trim()) return;

    // Display command with prompt
    appendOutput(
      `<div class="command-line"><span class="prompt">user㉿abdurrahim.dev:~$</span> ${command}</div>`
    );
    showCommandProcessing(() => {
      handleCommand(command);
      // Add to history if not duplicate
      if (command !== commandHistory[commandHistory.length - 1]) {
        commandHistory.push(command);
      }
      historyIndex = commandHistory.length;
    });
  }
  function scrollToBottom() {
    setTimeout(() => {
      const container = document.getElementById("terminal-container");
      container.scrollTop = container.scrollHeight;
    }, 30); // pastikan DOM render dulu
  }

  function handleCommand(command) {
    const [baseCommand, ...args] = command.trim().split(/\s+/);
    let result = "";

    switch (baseCommand.toLowerCase()) {
      case "help":
        result =
          window.innerWidth <= 768
            ? getCurrentDirectory()["help_mobile.txt"]
            : getCurrentDirectory()["help.txt"];
        break;

      case "ls": {
        const current = getCurrentDirectory();
        result = Object.keys(current).join("    ");
        break;
      }

      case "cat": {
        const fileName = args[0];
        if (!fileName) {
          result = "Usage: cat [filename]";
          break;
        }

        const current = getCurrentDirectory();
        if (fileName in current) {
          result = current[fileName];
        } else {
          result = `cat: ${fileName}: No such file`;
        }
        break;
      }

      case "cd": {
        const dir = args[0];
        if (!dir) {
          result = "Usage: cd [directory]";
          break;
        }

        if (dir === "..") {
          if (currentPath.length > 1) currentPath.pop();
        } else {
          const current = getCurrentDirectory();
          if (dir in current && typeof current[dir] === "object") {
            currentPath.push(dir);
          } else {
            result = `cd: ${dir}: No such directory`;
          }
        }
        break;
      }

      case "pwd":
        result = currentPath.join("/").replace(/^~$/, "~");
        break;

      case "whoami":
        result = "user";
        break;

      case "history":
        result = commandHistory.join("\n");
        break;

      case "echo":
        result = args.join(" ");
        break;

      case "open": {
        const site = args[0]?.toLowerCase();
        const urls = {
          github: "https://github.com/abdurrahimdev",
          linkedin: "https://linkedin.com/in/abdurrahimdev",
        };
        if (site in urls) {
          window.open(urls[site], "_blank");
          result = `Opening ${site}...`;
        } else {
          result = "Usage: open [github|linkedin]";
        }
        break;
      }
      case "date":
        result = new Date().toString();
        break;

      case "clear": {
        const pathString = currentPath.join("/").replace(/^~$/, "~");

        appendOutput(
          `<div class="command-line"><span class="prompt">user㉿abdurrahim.dev:${pathString}$</span> clear</div>`
        );

        return initializeTerminal(true); // tampilkan ulang tampilan awal tanpa animasi
      }

      default:
        result = `bash: perintah tidak ditemukan: ${baseCommand}`;
    }

    if (result) {
      const isHtml = /<[a-z][\s\S]*>/i.test(result);
      if (isHtml) {
        // Jika hasilnya mengandung HTML (seperti dari 'ls' yang berwarna),
        // tampilkan langsung agar tidak rusak.
        appendOutput(result, "pre-text");
      } else {
        // Jika hanya teks biasa (dari 'cat', 'help', 'history', dll.),
        // gunakan efek animasi ketikan.
        typeWriter(result, "pre-text");
      }
    }
  }

  function updatePrompt() {
    const prompt = document.getElementById("prompt");
    prompt.innerHTML = "user㉿abdurrahim.dev:$";

    const input = document.getElementById("terminal-input");
    input.value = "";
    input.disabled = false;
    input.focus();

    input.removeEventListener("keydown", handleInputKeyDown);
    input.addEventListener("keydown", handleInputKeyDown);

    function handleInputKeyDown(e) {
      if (isTyping) {
        e.preventDefault();
        return;
      }

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          executeCommand(e.target.value);
          e.target.value = "";
          break;
        case "ArrowUp":
          e.preventDefault();
          if (commandHistory.length > 0) {
            historyIndex = Math.max(0, historyIndex - 1);
            e.target.value = commandHistory[historyIndex] || "";
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (commandHistory.length > 0) {
            historyIndex = Math.min(commandHistory.length, historyIndex + 1);
            e.target.value =
              historyIndex >= commandHistory.length
                ? ""
                : commandHistory[historyIndex];
          }
          break;
      }
    }
    input.focus(); // Fokus otomatis setelah render
  }
  // Event listeners
  input.addEventListener("keydown", (e) => {
    if (isTyping) {
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        executeCommand(input.value);
        input.value = "";
        break;
      case "ArrowUp":
        e.preventDefault();
        if (commandHistory.length > 0) {
          historyIndex = Math.max(0, historyIndex - 1);
          input.value = commandHistory[historyIndex] || "";
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (commandHistory.length > 0) {
          historyIndex = Math.min(commandHistory.length, historyIndex + 1);
          input.value =
            historyIndex >= commandHistory.length
              ? ""
              : commandHistory[historyIndex];
        }
        break;
    }
  });

  // Terminal initialization
  function initializeTerminal(skipAnimation = false) {
    const asciiArt = `
+-----------------------------------------------------------------------------------+
  |                                                                                     |  
|    █████╗ ██████╗ ██████╗ ██╗   ██╗██████╗ ██████╗  █████╗ ██╗  ██╗██╗███╗   ███╗   |
|   ██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗██║  ██║██║████╗ ████║   |
|   ███████║██████╔╝██║  ██║██║   ██║██████╔╝██████╔╝███████║███████║██║██╔████╔██║   |
|   ██╔══██║██╔══██╗██║  ██║██║   ██║██╔══██╗██╔══██╗██╔══██║██╔══██║██║██║╚██╔╝██║   |
|   ██║  ██║██████╔╝██████╔╝╚██████╔╝██║  ██║██║  ██║██║  ██║██║  ██║██║██║ ╚═╝ ██║   |
|   ╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝   |
|                                                                  v1.0 by Abdurrahim |
+-----------------------------------------------------------------------------------+
`;
    function formatLine(cmd, desc) {
      return `| ${cmd.padEnd(22)} # ${desc.padEnd(30)}|`;
    }
    const quickStartGuide = `
Welcome to my interactive shell.

+------------------- Quick Start Guide -------------------+
| > cat about.txt       # Learn about me                 |
| > cat skills.txt      # See my technical skills        |
| > cat intership.txt   # See my internship              |
| > cat portfolio.txt   # See my project portfolio       |
| > cat socialmedia.txt # Find me on social media        |
| > open github         # Open my GitHub page            |
| > ls proyek/          # List my main projects          |
| > hisorty             # History Printah                |
| > clear               #  Clear Terminal                |
| > date                #  See Date and Time Terminal    |
+---------------------------------------------------------+

Type 'help' for the full list of commands.
`;

    const promptWrapper = document.querySelector(".prompt-wrapper");
    if (promptWrapper) promptWrapper.style.display = "none";

    if (skipAnimation) {
      outputContainer.innerHTML = "";
      appendOutput(asciiArt, "ascii-art");
      appendOutput(quickStartGuide, "quick-start-box");

      // ✅ tampilkan kembali prompt-wrapper
      if (promptWrapper) promptWrapper.style.display = "flex";

      // ✅ aktifkan input dan bind ulang
      updatePrompt();

      return;
    }

    // Booting animasi
    outputContainer.innerHTML = "";
    const input = document.getElementById("terminal-input");
    if (input) input.disabled = true;

    const bootSteps = [
      { text: "Booting Portfolio OS...", delay: 100 },
      { text: 'Initializing kernel<span class="blinking-cursor">', delay: 400 },
      { text: "Loading Portofolio profile: Abdurrahim", delay: 300 },
      {
        text: "Mounting virtual filesystem.....................[OK]",
        delay: 500,
      },
      { text: "Starting interactive shell...", delay: 200 },
    ];

    let step = 0;
    function runBootStep() {
      if (step < bootSteps.length) {
        appendOutput(bootSteps[step].text, "pre-text");
        setTimeout(runBootStep, bootSteps[step].delay);
        step++;
      } else {
        setTimeout(() => {
          outputContainer.innerHTML = "";
          typeWriter(asciiArt, "ascii-art", () => {
            typeWriter(quickStartGuide, "quick-start-box", () => {
              if (promptWrapper) promptWrapper.style.display = "flex";
              updatePrompt();
            });
          });
        }, 50);
      }
    }

    runBootStep();
  }

  // Start the terminal
  initializeTerminal();
});
