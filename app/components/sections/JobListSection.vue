<!--
  ============================================
  SECTION: JobListSection.vue
  ============================================
  
  FUNGSI:
  Section untuk menampilkan daftar lowongan kerja.
  Bisa dipakai di halaman beranda atau halaman lowongan.
  
  CARA PAKAI:
  ```vue
  <JobListSection 
    :jobs="jobsData"
    :loading="isLoading"
    title="Lowongan Terbaru"
    :show-more-link="true"
    @job-click="handleJobClick"
  />
  ```
  
  PROPS:
  - jobs: Array data lowongan
  - loading: Status loading
  - title: Judul section
  - subtitle: Subjudul (opsional)
  - showMoreLink: Tampilkan link "Lihat Semua"
  - limit: Batasi jumlah job yang ditampilkan
  
  ============================================
-->
<script setup lang="ts">
import type { Job } from '~/composables/useJobs'
import { ROUTES } from '~/config/routes'

// ========== PROPS ==========
interface Props {
  jobs: Job[]
  loading?: boolean
  title?: string
  subtitle?: string
  showMoreLink?: boolean
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  title: 'Lowongan Kerja',
  subtitle: '',
  showMoreLink: false,
  limit: 0
})

// ========== EMITS ==========
const emit = defineEmits<{
  jobClick: [job: Job]
}>()

// ========== COMPUTED ==========
const displayedJobs = computed(() => {
  if (props.limit > 0) {
    return props.jobs.slice(0, props.limit)
  }
  return props.jobs
})
</script>

<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
          <p v-if="subtitle" class="text-gray-600 mt-1">{{ subtitle }}</p>
        </div>
        <NuxtLink
          v-if="showMoreLink"
          :to="ROUTES.JOBS.LIST"
          class="text-blue-600 font-medium hover:text-blue-700"
        >
          Lihat Semua →
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="i in 4"
          :key="i"
          class="bg-gray-100 rounded-xl h-48 animate-pulse"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="displayedJobs.length === 0"
        class="text-center py-12 bg-gray-50 rounded-xl"
      >
        <p class="text-gray-500">Belum ada lowongan tersedia</p>
      </div>

      <!-- Job Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobCard
          v-for="job in displayedJobs"
          :key="job.id"
          :job="job"
          @click="emit('jobClick', job)"
        />
      </div>
    </div>
  </section>
</template>
