<!--
  ============================================
  FILE: pages/jobs/[id].vue
  ============================================
  
  FUNGSI:
  Halaman detail lowongan kerja (route: /jobs/:id)
  
  DYNAMIC ROUTE:
  [id] di nama file artinya parameter dinamis.
  /jobs/1, /jobs/2, /jobs/abc semua akan masuk ke file ini.
  Akses id dengan: route.params.id
  
  ============================================
-->
<script setup lang="ts">
import { useJobs, type Job } from '~/composables/useJobs'
import { ROUTES } from '~/config/routes'

// ========== ROUTE PARAMS ==========
const route = useRoute()
const router = useRouter()
const jobId = Number(route.params.id)

// ========== DATA ==========
const { getJobById } = useJobs()
const job = computed(() => getJobById(jobId))

// Redirect jika job tidak ditemukan
if (!job.value) {
  // Di production, ganti dengan halaman 404
  router.push(ROUTES.JOBS.LIST)
}

// ========== META SEO ==========
useSeoMeta({
  title: () => job.value ? `${job.value.title} - ${job.value.company}` : 'Lowongan Tidak Ditemukan',
  description: () => job.value?.description || ''
})

// ========== METHODS ==========
const handleApply = () => {
  alert('Fitur apply belum tersedia.\nNanti akan redirect ke form lamaran.')
}

// Format tanggal
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Job tidak ditemukan -->
    <div v-if="!job" class="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        Lowongan Tidak Ditemukan
      </h1>
      <NuxtLink
        :to="ROUTES.JOBS.LIST"
        class="text-blue-600 hover:text-blue-700"
      >
        ← Kembali ke Daftar Lowongan
      </NuxtLink>
    </div>

    <!-- Job Detail -->
    <template v-else>
      <!-- Header -->
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Breadcrumb -->
          <nav class="text-sm text-gray-500 mb-4">
            <NuxtLink :to="ROUTES.HOME" class="hover:text-blue-600">
              Beranda
            </NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink :to="ROUTES.JOBS.LIST" class="hover:text-blue-600">
              Lowongan
            </NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ job.title }}</span>
          </nav>

          <!-- Job Info -->
          <div class="flex items-start gap-6">
            <img
              :src="job.logo"
              :alt="job.company"
              class="w-20 h-20 rounded-xl object-cover"
            >
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900">{{ job.title }}</h1>
              <p class="text-lg text-gray-600 mt-1">{{ job.company }}</p>
              <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  📍 {{ job.location }}
                </span>
                <span class="flex items-center gap-1">
                  💼 {{ job.type }}
                </span>
                <span class="flex items-center gap-1">
                  💰 {{ job.salary }}
                </span>
              </div>
            </div>
            <button
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              @click="handleApply"
            >
              Lamar Sekarang
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Deskripsi -->
            <section class="bg-white rounded-xl p-6 shadow-sm">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Deskripsi Pekerjaan
              </h2>
              <p class="text-gray-600 whitespace-pre-line">
                {{ job.description }}
              </p>
            </section>

            <!-- Persyaratan -->
            <section class="bg-white rounded-xl p-6 shadow-sm">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Persyaratan
              </h2>
              <ul class="space-y-2">
                <li
                  v-for="(req, idx) in job.requirements"
                  :key="idx"
                  class="flex items-start gap-2 text-gray-600"
                >
                  <span class="text-green-500 mt-1">✓</span>
                  {{ req }}
                </li>
              </ul>
            </section>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-6">
            <!-- Info Card -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h3 class="font-semibold text-gray-900 mb-4">Informasi</h3>
              <dl class="space-y-4 text-sm">
                <div>
                  <dt class="text-gray-500">Diposting</dt>
                  <dd class="text-gray-900 font-medium">
                    {{ formatDate(job.postedAt) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-gray-500">Tipe Pekerjaan</dt>
                  <dd class="text-gray-900 font-medium">{{ job.type }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Lokasi</dt>
                  <dd class="text-gray-900 font-medium">{{ job.location }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Gaji</dt>
                  <dd class="text-gray-900 font-medium">{{ job.salary }}</dd>
                </div>
              </dl>
            </div>

            <!-- Apply Card -->
            <div class="bg-blue-50 rounded-xl p-6">
              <h3 class="font-semibold text-gray-900 mb-2">
                Tertarik dengan posisi ini?
              </h3>
              <p class="text-sm text-gray-600 mb-4">
                Kirim lamaranmu sekarang dan bergabung dengan tim {{ job.company }}
              </p>
              <button
                class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                @click="handleApply"
              >
                Lamar Sekarang
              </button>
            </div>
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>
