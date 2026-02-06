<!--
  ============================================
  FILE: components/JobCard.vue
  ============================================
  
  FUNGSI:
  Component untuk menampilkan 1 kartu lowongan kerja.
  Ini adalah UI component yang reusable.
  
  KENAPA PAKAI COMPONENT:
  - Kode lebih rapi dan terorganisir
  - Bisa dipakai ulang di banyak halaman
  - Mudah di-maintain (ubah di 1 tempat, berubah di semua)
  
  AUTO-IMPORT:
  Component di folder /components otomatis bisa dipakai.
  Tidak perlu import manual.
  
  CARA PAKAI:
  ```vue
  <JobCard :job="jobData" />
  ```
  
  PROPS:
  - job: Object berisi data lowongan (wajib)
  
  EMITS (EVENTS):
  - @click: Dipanggil saat card diklik
  
  ============================================
-->
<script setup lang="ts">
// Import type dari composable
import type { Job } from '~/composables/useJobs'

// ========== PROPS ==========
// Props adalah data yang dikirim dari parent component
// defineProps untuk mendefinisikan props yang diterima

interface Props {
  job: Job  // Data lowongan kerja (wajib)
}

const props = defineProps<Props>()

// ========== EMITS ==========
// Emits untuk mengirim event ke parent component

const emit = defineEmits<{
  click: [job: Job]  // Event saat card diklik
}>()

// ========== COMPUTED ==========
// Computed untuk format tanggal posting

const formattedDate = computed(() => {
  const date = new Date(props.job.postedAt)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hari ini'
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`
  return `${Math.floor(diffDays / 30)} bulan lalu`
})

// Warna badge berdasarkan tipe pekerjaan
const typeColor = computed(() => {
  const colors: Record<string, string> = {
    'Full-time': 'bg-green-100 text-green-700',
    'Part-time': 'bg-blue-100 text-blue-700',
    'Magang': 'bg-purple-100 text-purple-700',
    'Kontrak': 'bg-orange-100 text-orange-700'
  }
  return colors[props.job.type] || 'bg-gray-100 text-gray-700'
})
</script>

<template>
  <!-- 
    Card Container
    - cursor-pointer: Tanda bisa diklik
    - hover:shadow-lg: Shadow membesar saat hover
    - transition-all: Animasi smooth
  -->
  <article
    class="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-200"
    @click="emit('click', job)"
  >
    <!-- Header: Logo + Info Perusahaan -->
    <div class="flex items-start gap-4">
      <!-- Logo Perusahaan -->
      <img
        :src="job.logo"
        :alt="`Logo ${job.company}`"
        class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      >

      <!-- Info Utama -->
      <div class="flex-1 min-w-0">
        <!-- Judul Lowongan -->
        <h3 class="font-semibold text-gray-900 text-lg truncate">
          {{ job.title }}
        </h3>

        <!-- Nama Perusahaan -->
        <p class="text-gray-600 text-sm">
          {{ job.company }}
        </p>
      </div>

      <!-- Badge Tipe Pekerjaan -->
      <span
        :class="typeColor"
        class="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0"
      >
        {{ job.type }}
      </span>
    </div>

    <!-- Info Tambahan: Lokasi + Gaji -->
    <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
      <!-- Lokasi -->
      <div class="flex items-center gap-1">
        <!-- Icon Location (inline SVG) -->
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ job.location }}</span>
      </div>

      <!-- Gaji -->
      <div class="flex items-center gap-1">
        <!-- Icon Money -->
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ job.salary }}</span>
      </div>
    </div>

    <!-- Deskripsi Singkat -->
    <p class="mt-4 text-gray-600 text-sm line-clamp-2">
      {{ job.description }}
    </p>

    <!-- Footer: Waktu Posting -->
    <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
      <span class="text-xs text-gray-400">
        Diposting {{ formattedDate }}
      </span>

      <!-- Tombol Lihat Detail -->
      <span class="text-blue-600 text-sm font-medium hover:text-blue-700">
        Lihat Detail →
      </span>
    </div>
  </article>
</template>
