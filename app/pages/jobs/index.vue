<!--
  ============================================
  FILE: pages/jobs/index.vue
  ============================================
  
  FUNGSI:
  Halaman daftar semua lowongan kerja (route: /jobs)
  
  STRUKTUR SECTIONS:
  Halaman ini menggunakan sections dari folder:
  /components/sections/jobs/
  
  SECTIONS YANG DIGUNAKAN:
  1. HeaderSection  - Header halaman
  2. FilterSection  - Sidebar filter
  
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

// State untuk filter
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
    <!--
      ========================================
      SECTIONS HALAMAN JOBS
      ========================================
      Semua section untuk halaman ini ada di:
      /components/sections/jobs/
      
      Penamaan component: SectionsJobs[NamaSection]
      ========================================
    -->

    <!-- 1. Header Section -->
    <SectionsJobsHeaderSection :total-jobs="jobs.length" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- 2. Filter Section (Sidebar) -->
        <SectionsJobsFilterSection
          v-model:search="searchQuery"
          v-model:type="selectedType"
          v-model:location="selectedLocation"
          :job-types="jobTypes"
          :locations="locations"
          @reset="clearFilters"
        />

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
