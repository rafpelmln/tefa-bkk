/**
 * ============================================
 * FILE: composables/useJobs.ts
 * ============================================
 *
 * FUNGSI:
 * Composable adalah tempat menyimpan logic yang bisa dipakai ulang.
 * File ini khusus untuk mengelola data lowongan kerja.
 *
 * ATURAN PENAMAAN:
 * - Harus diawali dengan "use" (useJobs, useAuth, useCart, dll)
 * - Auto-import, tidak perlu import manual di component
 *
 * CARA PAKAI:
 * ```vue
 * <script setup>
 * const { jobs, isLoading, error } = useJobs()
 * </script>
 * ```
 *
 * KAPAN BUAT COMPOSABLE:
 * - Logic yang dipakai di lebih dari 1 component
 * - Fetch data dari API
 * - State management sederhana
 * - Utility functions
 *
 * ============================================
 */

// Type definition untuk Job
// Definisikan struktur data lowongan kerja
export interface Job {
  id: number
  title: string           // Judul lowongan
  company: string         // Nama perusahaan
  location: string        // Lokasi kerja
  type: 'Full-time' | 'Part-time' | 'Magang' | 'Kontrak'
  salary: string          // Range gaji
  description: string     // Deskripsi pekerjaan
  requirements: string[]  // Persyaratan
  postedAt: string        // Tanggal posting
  logo: string            // URL logo perusahaan
}

/**
 * Composable untuk mengambil dan mengelola data lowongan kerja
 *
 * @returns Object berisi:
 * - jobs: Array data lowongan
 * - isLoading: Status loading
 * - error: Error message jika gagal
 * - refresh: Function untuk refresh data
 */
export const useJobs = () => {
  // ========== DATA DUMMY ==========
  // Untuk development, pakai data dummy dulu
  // Nanti ganti dengan useFetch() ke API backend

  const jobs = ref<Job[]>([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'PT Teknologi Indonesia',
      location: 'Jakarta Selatan',
      type: 'Full-time',
      salary: 'Rp 5.000.000 - Rp 8.000.000',
      description: 'Membangun dan mengembangkan user interface untuk aplikasi web perusahaan menggunakan Vue.js dan React.',
      requirements: [
        'Menguasai HTML, CSS, JavaScript',
        'Pengalaman dengan Vue.js atau React',
        'Memahami responsive design',
        'Lulusan SMK jurusan RPL/TKJ'
      ],
      postedAt: '2026-02-01',
      logo: 'https://ui-avatars.com/api/?name=PT+TI&background=3B82F6&color=fff'
    },
    {
      id: 2,
      title: 'Staff Administrasi',
      company: 'CV Maju Bersama',
      location: 'Bandung',
      type: 'Full-time',
      salary: 'Rp 3.500.000 - Rp 4.500.000',
      description: 'Mengelola dokumen administrasi kantor, input data, dan membantu operasional harian.',
      requirements: [
        'Menguasai Microsoft Office',
        'Teliti dan rapi',
        'Komunikasi baik',
        'Lulusan SMK jurusan OTKP/Administrasi'
      ],
      postedAt: '2026-02-03',
      logo: 'https://ui-avatars.com/api/?name=CV+MB&background=10B981&color=fff'
    },
    {
      id: 3,
      title: 'Teknisi Jaringan',
      company: 'PT Network Solutions',
      location: 'Surabaya',
      type: 'Kontrak',
      salary: 'Rp 4.000.000 - Rp 6.000.000',
      description: 'Instalasi, konfigurasi, dan maintenance jaringan komputer perusahaan.',
      requirements: [
        'Menguasai TCP/IP, routing, switching',
        'Sertifikasi MTCNA menjadi nilai plus',
        'Bersedia bekerja shift',
        'Lulusan SMK jurusan TKJ'
      ],
      postedAt: '2026-02-05',
      logo: 'https://ui-avatars.com/api/?name=PT+NS&background=8B5CF6&color=fff'
    },
    {
      id: 4,
      title: 'Desainer Grafis',
      company: 'Creative Studio',
      location: 'Yogyakarta',
      type: 'Magang',
      salary: 'Rp 1.500.000 - Rp 2.500.000',
      description: 'Membuat desain untuk kebutuhan marketing seperti poster, banner, dan konten sosial media.',
      requirements: [
        'Menguasai Adobe Photoshop & Illustrator',
        'Kreatif dan update dengan tren desain',
        'Portfolio wajib dilampirkan',
        'Lulusan SMK jurusan Multimedia/DKV'
      ],
      postedAt: '2026-02-04',
      logo: 'https://ui-avatars.com/api/?name=CS&background=EC4899&color=fff'
    }
  ])

  // State untuk loading dan error
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ========== FETCH DARI API (CONTOH) ==========
  // Uncomment kode di bawah saat sudah ada backend API
  /*
  const { data: jobs, pending: isLoading, error } = await useFetch<Job[]>('/api/jobs', {
    // Options
    lazy: true,  // Fetch setelah component mounted
    server: true // Fetch di server-side juga
  })
  */

  /**
   * Function untuk refresh data
   * Panggil saat user klik tombol refresh atau setelah submit form
   */
  const refresh = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 500))
      // Nanti ganti dengan actual API call:
      // const response = await $fetch('/api/jobs')
      // jobs.value = response
    } catch (e) {
      error.value = 'Gagal memuat data lowongan'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Function untuk mencari lowongan berdasarkan keyword
   */
  const searchJobs = (keyword: string) => {
    if (!keyword) return jobs.value

    const lowerKeyword = keyword.toLowerCase()
    return jobs.value.filter(job =>
      job.title.toLowerCase().includes(lowerKeyword) ||
      job.company.toLowerCase().includes(lowerKeyword) ||
      job.location.toLowerCase().includes(lowerKeyword)
    )
  }

  /**
   * Function untuk mendapatkan 1 job berdasarkan ID
   */
  const getJobById = (id: number) => {
    return jobs.value.find(job => job.id === id)
  }

  // Return semua yang dibutuhkan component
  return {
    jobs,
    isLoading,
    error,
    refresh,
    searchJobs,
    getJobById
  }
}
