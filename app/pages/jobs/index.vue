<!--
  ============================================
  FILE: pages/jobs/index.vue
  ============================================
  
  FUNGSI:
  Halaman daftar semua lowongan kerja (route: /jobs)
  
  FITUR:
  - Search & filter lowongan
  - Pagination
  - Filter berdasarkan kategori, lokasi, tipe
  
  ============================================
-->
<script setup lang="ts">
import { useJobs, type Job } from '~/composables/useJobs'
import { ROUTES } from '~/config/routes'

// ========== META SEO ==========
useSeoMeta({
  title: 'Daftar Lowongan Kerja - Bursa Kerja Khusus',
  description: 'Temukan berbagai lowongan kerja terbaru dari perusahaan terpercaya.'
})

// ========== DATA ==========
const { jobs, isLoading, searchJobs } = useJobs()
const route = useRoute()
const router = useRouter()

// State
const searchQuery = ref((route.query.q as string) || '')
const selectedType = ref('')
const selectedLocation = ref('')

// ========== COMPUTED ==========
const filteredJobs = computed(() => {
  let result = jobs.value

  // Filter by search query
  if (searchQuery.value) {
    result = searchJobs(searchQuery.value)
  }

  // Filter by type
  if (selectedType.value) {
    result = result.filter((job: Job) => job.type === selectedType.value)
  }

  // Filter by location
  if (selectedLocation.value) {
    result = result.filter((job: Job) => 
      job.location.toLowerCase().includes(selectedLocation.value.toLowerCase())
    )
  }

  return result
})

// Options untuk filter
const jobTypes = ['Full-time', 'Part-time', 'Magang', 'Kontrak']
const locations = computed(() => {
  const locs = [...new Set(jobs.value.map((j: Job) => j.location))]
  return locs
})

// ========== METHODS ==========
const handleJobClick = (job: Job) => {
  router.push(ROUTES.JOBS.DETAIL(job.id))
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedLocation.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-blue-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold">Lowongan Kerja</h1>
        <p class="mt-2 text-blue-100">
          Temukan {{ jobs.length }} lowongan yang tersedia
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-xl p-6 shadow-sm sticky top-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-semibold text-gray-900">Filter</h2>
              <button
                class="text-sm text-blue-600 hover:text-blue-700"
                @click="clearFilters"
              >
                Reset
              </button>
            </div>

            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Cari
              </label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Posisi atau perusahaan..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <!-- Type Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tipe Pekerjaan
              </label>
              <select
                v-model="selectedType"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Tipe</option>
                <option v-for="type in jobTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>

            <!-- Location Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <select
                v-model="selectedLocation"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Lokasi</option>
                <option v-for="loc in locations" :key="loc" :value="loc">
                  {{ loc }}
                </option>
              </select>
            </div>
          </div>
        </aside>

        <!-- Job List -->
        <main class="flex-1">
          <!-- Results Count -->
          <p class="text-gray-600 mb-4">
            Menampilkan {{ filteredJobs.length }} lowongan
          </p>

          <!-- Loading -->
          <div v-if="isLoading" class="space-y-4">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-100 rounded-xl h-48 animate-pulse"
            />
          </div>

          <!-- Empty State -->
          <div
            v-else-if="filteredJobs.length === 0"
            class="text-center py-12 bg-white rounded-xl"
          >
            <p class="text-gray-500">Tidak ada lowongan yang sesuai filter</p>
            <button
              class="mt-4 text-blue-600 hover:text-blue-700"
              @click="clearFilters"
            >
              Reset Filter
            </button>
          </div>

          <!-- Job Cards -->
          <div v-else class="space-y-4">
            <JobCard
              v-for="job in filteredJobs"
              :key="job.id"
              :job="job"
              @click="handleJobClick"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
