// src/data/portfolioData.ts

export interface ProjectItem {
  id: string
  title: string
  description: string
  live_url?: string | null
  github_url?: string | null
  technologies: string[]
  key_features: string[]
  image_url: string
  image_urls: string[]
  created_at?: string
}

export interface CertificateItem {
  id: number | string
  title: string
  issuer?: string
  image_url: string
  /** Human-readable issue date, e.g. "11 Jul 2024" */
  date?: string
  /** Optional link to the original PDF / credential page */
  credential_url?: string
  created_at?: string
}

export interface TechStackItem {
  id: number | string
  name: string
  logo_url: string
  category?: 'frontend' | 'backend' | 'database' | 'tools'
  created_at?: string
}

export interface CommentReply {
  username: string
  message: string
  created_at: string
}

export interface CommentItem {
  id: number
  name: string
  comment: string
  image_url: string | null
  likes: number
  replies?: CommentReply[]
  is_pinned: boolean
  created_at?: string
}

export const dummyProjects: ProjectItem[] = [
  {
    id: '1a2b3c4d-0000-4000-8000-000000000001',
    title: 'LE Academy – Multi-Segment Learning Management System',
    description:
      'LE Academy adalah platform Learning Management System (LMS) modern berbasis web yang mengadopsi arsitektur decoupled front-end & back-end. Dirancang untuk mengakomodasi berbagai segmen pengguna (Siswa Bimbingan Belajar, Karyawan Korporat, Mentor, dan Lembaga B2B Partner) dalam satu sistem terpadu. Dilengkapi Role-Based Access Control (RBAC) 5 peran, sistem gamifikasi pembelajaran edukatif (poin XP, level progression, streak belajar harian, dan global leaderboard), reader in-app materi interaktif, engine evaluasi kuis otomatis & penugasan berkas, webinar live, hingga penerbitan e-sertifikat kelulusan digital.',
    live_url: 'https://github.com/ArisStiawan/le-academy_lms',
    github_url: 'https://github.com/ArisStiawan/le-academy_lms',
    technologies: [
      'Laravel 11',
      'Next.js 16',
      'React 19',
      'PHP 8.3',
      'TypeScript',
      'Tailwind CSS 4',
      'PostgreSQL',
      'Laravel Sanctum',
      'Framer Motion',
      'RESTful API',
    ],
    key_features: [
      'Multi-Segment & Multi-Role RBAC (5 Dasbor Terisolasi: Administrator, Mentor, Siswa, Karyawan, dan Lembaga)',
      'Sistem Gamifikasi Pembelajaran (Poin XP Otomatis, Level Progression, Runtutan Streak, & Real-time Global Leaderboard)',
      'Manajemen Kurikulum & Konten Modular (Reader In-App, Video Pembelajaran, & Tracking Progres Materi per Siswa)',
      'Engine Evaluasi Terintegrasi (Kuis Pilihan Ganda Auto-Grading & Penugasan Berkas Manual dengan Feedback Mentor)',
      'Manajemen Bimbingan Daring & Webinar Live Terintegrasi',
      'Penerbitan E-Sertifikat Kelulusan Otomatis & Transkrip Riwayat Belajar Lengkap',
    ],
    image_url: '/assets/projects/leacademy/Hero.png',
    image_urls: [
      '/assets/projects/leacademy/Hero.png',
      '/assets/projects/leacademy/Dashboard.png',
      '/assets/projects/leacademy/Materi.png',
    ],
  },
  {
    id: '1a2b3c4d-0000-4000-8000-000000000002',
    title: 'EarScope-AI – Intelligent Otoscope Diagnosis & Telemedicine Platform',
    description:
      'EarScope-AI adalah sistem telemedicine dan diagnosis kesehatan telinga luar & tengah berbasis Deep Learning (YOLOv8) terintegrasi. Dirancang sebagai proyek Tugas Akhir (TA) untuk membantu dokter THT melakukan pemeriksaan klinis secara objektif dan real-time menggunakan kamera otoskop USB dan edge AI (NVIDIA Jetson). Mengadopsi arsitektur Decoupled Dual-Server: Laravel 11 untuk manajemen antrean pasien, rekam medis digital, dan sinkronisasi Cloudinary Video, serta Flask microservice untuk streaming kamera low-latency MJPEG dan inferensi otomatis 6 kondisi telinga (Otitis Media Akut, Kronis, Serumen Plug, Myringosklerosis, Normal, dan Undefined).',
    live_url: 'https://github.com/ArisStiawan/EarScope-AI',
    github_url: 'https://github.com/ArisStiawan/EarScope-AI',
    technologies: [
      'Python',
      'YOLOv8',
      'Laravel 11',
      'Flask',
      'OpenCV',
      'PyTorch',
      'NVIDIA Jetson',
      'MySQL',
      'Tailwind CSS',
      'Cloudinary API',
    ],
    key_features: [
      'Real-time Otoscope Video Stream (Streaming MJPEG low-latency via OpenCV)',
      'Deteksi AI 6 Kondisi Telinga (YOLOv8 Object Detection & Auto-Bounding Box)',
      'Arsitektur Decoupled Dual-Server (Laravel 11 Web App & Flask AI Service)',
      'Portal Telemedicine Multi-Role (Akses Mandiri untuk Dokter, Pasien, dan Admin)',
      'Manajemen Antrean Konsultasi, Rekam Medis (EMR), & Otomasi Hasil Diagnosis',
      'Transcoding & Cloud Storage Video via Cloudinary (Auto-convert H.264 MP4)',
    ],
    image_url: '/assets/projects/Earscope/Result.png',
    image_urls: [
      '/assets/projects/Earscope/Login.png',
      '/assets/projects/Earscope/DoctorDashboard.png',
      '/assets/projects/Earscope/PatientDashboard.png',
      '/assets/projects/Earscope/Result.png',
    ],
  },
  {
    id: '1a2b3c4d-0000-4000-8000-000000000003',
    title: 'MiddleBoard – Enterprise Project Management & Production Tracker',
    description:
      'MiddleBoard adalah platform manajemen proyek dan pelacakan produksi berbasis web enterprise yang dikembangkan untuk PT Kodegiri. Sistem ini mengadopsi arsitektur decoupled (Laravel 11 REST API + Vue.js 3 SPA) dengan containerisasi Docker Compose (Backend, Frontend, MySQL 8, dan Nginx Reverse Proxy). Dirancang untuk membantu tim operasional melacak pipeline proyek secara end-to-end: dari waiting list request, quotation, alokasi sumber daya, production board tracking, manajemen dokumen internal/eksternal, hingga pelacakan pembayaran pihak ketiga. Dilengkapi dengan Role-Based Access Control, auto-generated PDF report via DomPDF, dan API documentation via Scramble & Scribe.',
    live_url: 'https://board.kodeno.id',
    github_url: 'https://github.com/kodegiri/MiddleBoard-BE',
    technologies: [
      'Laravel 11',
      'Vue.js 3',
      'PHP 8.2',
      'JavaScript',
      'Tailwind CSS',
      'MySQL',
      'Docker',
      'Nginx',
      'Laravel Sanctum',
      'Chart.js',
    ],
    key_features: [
      'Pipeline Proyek End-to-End (Waiting List → Quotation → Resource Pool → Production Board → Delivery)',
      'Role-Based Access Control (RBAC) dengan Multi-Ability per Role (Sales, PM, Engineer, Admin)',
      'Production Board Tracking & Project Allocation dengan Visual Dashboard',
      'Manajemen Dokumen Internal/Eksternal & Third-Party Payment Tracker',
      'Auto-Generated PDF Report (Quotation & Invoice) via DomPDF',
      'Containerisasi Docker Compose (BE + FE + MySQL + Nginx Reverse Proxy)',
      'REST API Documentation otomatis via Scramble & Scribe',
    ],
    image_url: '/assets/projects/Middleboard/UserManage.png',
    image_urls: [
      '/assets/projects/Middleboard/UserManage.png',
      '/assets/projects/middleboard.webp',
    ],
  },
  {
    id: '1a2b3c4d-0000-4000-8000-000000000004',
    title: 'PawOn-Sight – Smart Bakery Inventory & Financial Management',
    description:
      'PawOn-Sight adalah sistem informasi manajemen toko roti/bakery modern berbasis web yang mengintegrasikan pencatatan stok bahan baku, produk reguler & spesial, rekomendasi produksi, serta laporan pemasukan dan pengeluaran. Dibangun dengan Laravel 11 dan Filament 3 Admin Panel, aplikasi ini menyediakan dashboard interaktif dengan widget statistik real-time, grafik tren produksi & penjualan (Chart.js), manajemen kategori produk, fitur import/export data via Excel (Maatwebsite), autentikasi JWT, dan proteksi reCAPTCHA. Dirancang dengan Cluster-based Navigation untuk pengelompokan fitur produk yang terorganisir.',
    live_url: 'https://github.com/ArisStiawan/PawOn-Sight',
    github_url: 'https://github.com/ArisStiawan/PawOn-Sight',
    technologies: [
      'Laravel 11',
      'Filament 3',
      'PHP 8.2',
      'Tailwind CSS',
      'Vue.js',
      'MySQL',
      'Chart.js',
      'JWT Auth',
      'Maatwebsite Excel',
    ],
    key_features: [
      'Dashboard Analitik Real-time (Widget Statistik, Grafik Tren Produksi & Penjualan)',
      'Manajemen Stok Bahan Baku & Stock Opname dengan Pelacakan Historis',
      'Katalog Produk Reguler & Spesial dengan Cluster-based Navigation',
      'Sistem Rekomendasi Produksi Otomatis Berdasarkan Data Penjualan',
      'Pencatatan Pemasukan & Pengeluaran dengan Laporan Keuangan Periodik',
      'Import/Export Data Excel (Maatwebsite) & Backup Database (Spatie)',
      'Autentikasi JWT & Proteksi Form dengan Google reCAPTCHA',
    ],
    image_url: '/assets/projects/Pawon/Dashboard.png',
    image_urls: [
      '/assets/projects/Pawon/Dashboard.png',
      '/assets/projects/Pawon/pawonsight.webp',
      
    ],
  },
  {
    id: '1a2b3c4d-0000-4000-8000-000000000005',
    title: 'Simslife Face Recognition – AI-Powered Attendance System',
    description:
      'Simslife Face Recognition adalah sistem absensi kehadiran otomatis berbasis pengenalan wajah (Face Recognition) yang dikembangkan saat program magang. Berjalan di perangkat NVIDIA Jetson AGX Xavier untuk akselerasi GPU real-time, sistem ini mendeteksi wajah karyawan melalui kamera live dan mencatat kehadiran secara otomatis ke database SQLite. Dilengkapi FastAPI REST backend untuk integrasi multi-device, Streamlit dashboard interaktif untuk monitoring kehadiran & registrasi wajah baru, serta fitur auto-checkout otomatis. Mendukung multi-pose encoding (center, left, right) dan akselerasi hardware CUDA untuk performa inference optimal.',
    live_url: 'https://github.com/ArisStiawan/Sistem-Absensi-Berbasis-FaceRecognition',
    github_url: 'https://github.com/ArisStiawan/Sistem-Absensi-Berbasis-FaceRecognition',
    technologies: [
      'Python',
      'OpenCV',
      'face_recognition',
      'FastAPI',
      'Streamlit',
      'SQLite',
      'NVIDIA Jetson',
      'CUDA',
      'Plotly',
    ],
    key_features: [
      'Real-time Face Detection & Recognition via Kamera Live (OpenCV + dlib)',
      'Multi-Pose Face Encoding (Center, Left, Right) untuk Akurasi Tinggi',
      'Akselerasi GPU Hardware (NVIDIA Jetson AGX Xavier + CUDA)',
      'FastAPI REST Backend untuk Integrasi Multi-Device & IoT',
      'Streamlit Dashboard Interaktif (Monitoring Kehadiran, Registrasi Wajah, User Management)',
      'Auto-Checkout Otomatis & Pelacakan Kehadiran Harian ke CSV/SQLite',
      'OAuth2 Authentication & Role-Based API Access',
    ],
    image_url: '/assets/projects/Attendance/Overview.png',
    image_urls: [
      '/assets/projects/Attendance/Overview.png',
      '/assets/projects/Attendance/RegUser.png',
      '/assets/projects/Attendance/UserManage.png',
    ],
  },
  {
    id: '1a2b3c4d-0000-4000-8000-000000000006',
    title: 'JoinSystem – Blog & Content Management Platform (Vue 3 + TypeScript)',
    description:
      'JoinSystem adalah platform blog dan manajemen konten modern yang dibangun dengan Vue 3 Composition API, TypeScript, dan Vite. Menampilkan antarmuka responsif dengan DaisyUI + Tailwind CSS, aplikasi ini menyediakan halaman beranda dinamis dengan Hero Section, Featured Posts, Category Browser, Author Profiles, Testimonials, dan Join Section. Dilengkapi routing multi-halaman (About, Blog, Contact, Privacy, Category, Author Detail) menggunakan Vue Router, state management via Pinia, dan arsitektur component-based yang modular.',
    live_url: 'https://github.com/ArisStiawan/latihan-slicing',
    github_url: 'https://github.com/ArisStiawan/latihan-slicing',
    technologies: [
      'Vue.js 3',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'DaisyUI',
      'Pinia',
      'Vue Router',
      'SASS',
    ],
    key_features: [
      'Vue 3 Composition API dengan TypeScript untuk Type Safety',
      'Desain Responsif Modern dengan DaisyUI + Tailwind CSS',
      'Multi-Page Routing (Home, About, Blog, Contact, Category, Author, Privacy)',
      'Component-Based Architecture (Hero, Featured Post, Category, Special Post, Testimonial)',
      'State Management dengan Pinia & Vue Router Navigation Guards',
      'Build Optimization via Vite dengan Hot Module Replacement (HMR)',
    ],
    image_url: '/assets/projects/Slicing/Hero.png',
    image_urls: [
      '/assets/projects/Slicing/Hero.png',
      '/assets/projects/Slicing/Featured.png',
      '/assets/projects/Slicing/Why.png',
    ],
  },
]

export const dummyCertificates: CertificateItem[] = [
  {
    id: 1,
    title: 'Sertifikat Kompetensi BNSP — Pemrogram / Programmer',
    issuer: 'BNSP · LSP Universitas Sebelas Maret',
    date: '25 Apr 2026',
    image_url: '/assets/certificates/bnsp-junior-web-developer.webp',
  },
  {
    id: 2,
    title: 'Frontend Developer — Bootcamp SISTEM × D3 TI UNS',
    issuer: 'SISTEM Bootcamp',
    image_url: '/assets/certificates/sistem-frontend-developer.webp',
  },
  {
    id: 3,
    title: 'Introduction to IoT and Digital Transformation',
    issuer: 'Cisco Networking Academy',
    date: '28 Dec 2024',
    image_url: '/assets/certificates/ccna-iot-digital-transformation.webp',
  },
  {
    id: 4,
    title: 'PCAP: Programming Essentials in Python',
    issuer: 'OpenEDG Python Institute × Cisco Networking Academy',
    date: '11 Jul 2024',
    image_url: '/assets/certificates/pcap-python-essentials.webp',
  },
  {
    id: 5,
    title: 'PCAP: Programming Essentials in Python',
    issuer: 'Cisco Networking Academy',
    date: '11 Jul 2024',
    image_url: '/assets/certificates/ccna-python-essentials.webp',
  },
  {
    id: 6,
    title: 'Database Design',
    issuer: 'Oracle Academy',
    date: '11 Jul 2024',
    image_url: '/assets/certificates/database-design.webp',
  },
  {
    id: 7,
    title: 'Java Fundamentals',
    issuer: 'Oracle Academy',
    date: '23 Jun 2024',
    image_url: '/assets/certificates/java-fundamentals.webp',
  },
  {
    id: 8,
    title: 'CCNAv7: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '16 Feb 2024',
    image_url: '/assets/certificates/ccna-introduction-to-networks.webp',
  },
]

export const dummyTechStacks: TechStackItem[] = [
  {
    id: 1,
    name: 'Next.js',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    id: 2,
    name: 'React',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    id: 3,
    name: 'TypeScript',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    id: 4,
    name: 'Tailwind CSS',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    id: 5,
    name: 'Node.js',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    id: 6,
    name: 'PostgreSQL',
    category: 'database',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    id: 7,
    name: 'Supabase',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  },
  {
    id: 8,
    name: 'Docker',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    id: 9,
    name: 'Git',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    id: 10,
    name: 'Figma',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    id: 11,
    name: 'JavaScript',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    id: 12,
    name: 'Express.js',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    id: 13,
    name: 'MySQL',
    category: 'database',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    id: 14,
    name: 'MongoDB',
    category: 'database',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    id: 15,
    name: 'GitHub',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
  {
    id: 16,
    name: 'Laravel',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  },
  {
    id: 17,
    name: 'PHP',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    id: 18,
    name: 'Python',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    id: 19,
    name: 'Flask',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  },
  {
    id: 20,
    name: 'PyTorch',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  },
  {
    id: 21,
    name: 'Vue.js',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    id: 22,
    name: 'Vite',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  },
  {
    id: 23,
    name: 'FastAPI',
    category: 'backend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  },
  {
    id: 24,
    name: 'Streamlit',
    category: 'frontend',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
  },
  {
    id: 25,
    name: 'SQLite',
    category: 'database',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  },
  {
    id: 26,
    name: 'Nginx',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  },
  {
    id: 27,
    name: 'OpenCV',
    category: 'tools',
    logo_url:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
  },
]

export const dummyComments: CommentItem[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    comment:
      'Portfolio yang sangat rapi dan interaktif! Desain UI/UX serta transisi Framer Motion-nya sangat memanjakan mata.',
    image_url: null,
    likes: 8,
    is_pinned: true,
    created_at: '2026-03-01T10:00:00.000Z',
    replies: [
      {
        username: 'Aris Setiawan',
        message: 'Terima kasih banyak atas feedback positifnya, mas Budi!',
        created_at: '2026-03-01T11:15:00.000Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Siti Rahma',
    comment:
      'Implementasi modern tech stack Next.js & DevOps arsitekturnya solid banget. Sukses selalu untuk project-project berikutnya!',
    image_url: null,
    likes: 5,
    is_pinned: false,
    created_at: '2026-03-05T14:30:00.000Z',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    comment:
      'Desainnya futuristik dan loading-nya super cepat. Inspiratif sekali!',
    image_url: null,
    likes: 4,
    is_pinned: false,
    created_at: '2026-03-08T09:45:00.000Z',
  },
]

