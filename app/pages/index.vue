<!--
  ============================================
  FILE: pages/index.vue
  ============================================
  
  FUNGSI:
  Halaman utama aplikasi (route: /)
  
  STRUKTUR:
  Halaman ini menggunakan section components yang terpisah.
  Setiap section adalah component reusable di folder:
  /components/sections/
  
  SECTIONS YANG DIGUNAKAN:
  1. HeroSection      - Hero dengan search bar
  2. JobListSection   - Daftar lowongan terbaru
  3. CategorySection  - Kategori berdasarkan jurusan
  4. CtaSection       - Call to action
  
  ============================================
-->
<script setup lang="ts">
import { useJobs, type Job } from '~/composables/useJobs'
import { ROUTES } from '~/config/routes'

// ========== META SEO ==========
useSeoMeta({
  title: 'Bursa Kerja Khusus - Temukan Karir Impianmu',
  description: 'Platform penghubung antara siswa SMK dengan dunia industri. Temukan lowongan kerja terbaik sesuai keahlianmu.'
})

// ========== DATA ==========
const { jobs, isLoading } = useJobs()
const router = useRouter()

// ========== METHODS ==========
// Handle search dari HeroSection
const handleSearch = (query: string) => {
  router.push({ path: ROUTES.JOBS.LIST, query: { q: query } })
}

// Handle klik job dari JobListSection
const handleJobClick = (job: Job) => {
  router.push(ROUTES.JOBS.DETAIL(job.id))
}

// Handle klik kategori dari CategorySection
const handleCategoryClick = (category: string) => {
  router.push(ROUTES.JOBS.BY_CATEGORY(category))
}
</script>

<template>
  <div>
    <!--
      ========================================
      SECTION COMPONENTS
      ========================================
      Setiap section dipisah menjadi component sendiri
      untuk memudahkan maintenance dan reusability.
      
      Components ada di: /components/sections/
      Auto-import, tidak perlu import manual.
      ========================================
    -->

    <!-- 1. Hero Section: Headline + Search Bar -->
    <SectionsHeroSection @search="handleSearch" />

    <!-- 2. Job List Section: Lowongan Terbaru -->
    <SectionsJobListSection
      :jobs="jobs"
      :loading="isLoading"
      :limit="4"
      title="Lowongan Terbaru"
      subtitle="Peluang kerja terbaru untuk kamu"
      :show-more-link="true"
      @job-click="handleJobClick"
    />

    <!-- 3. Category Section: Kategori Jurusan -->
    <SectionsCategorySection @category-click="handleCategoryClick" />

    <!-- 4. CTA Section: Call to Action -->
    <SectionsCtaSection />
  </div>
</template>
