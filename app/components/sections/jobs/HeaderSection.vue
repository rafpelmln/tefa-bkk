<!--
  ============================================
  SECTION: jobs/HeaderSection.vue
  ============================================
  
  LOKASI: components/sections/jobs/
  HALAMAN: Daftar Lowongan (pages/jobs/index.vue)
  
  FUNGSI:
  Header section untuk halaman daftar lowongan.
  
  CARA PAKAI:
  ```vue
  <SectionsJobsHeaderSection :total-jobs="100" />
  ```
  
  ============================================
-->
<script setup lang="ts">
// ========== PROPS ==========
interface Props {
  totalJobs: number
}

defineProps<Props>()
</script>

<template>
  <div class="bg-blue-600 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold">Lowongan Kerja</h1>
      <p class="mt-2 text-blue-100">
        Temukan {{ totalJobs }} lowongan yang tersedia
      </p>
    </div>
  </div>
</template>
