<!--
  ============================================
  SECTION: HeroSection.vue
  ============================================
  
  FUNGSI:
  Hero section untuk halaman beranda.
  Berisi headline, search bar, dan statistik.
  
  CARA PAKAI:
  ```vue
  <HeroSection 
    @search="handleSearch" 
  />
  ```
  
  ============================================
-->
<script setup lang="ts">
// ========== EMITS ==========
const emit = defineEmits<{
  search: [query: string]
}>()

// ========== STATE ==========
const searchQuery = ref('')

// ========== METHODS ==========
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}

// Stats data
const stats = [
  { value: '500+', label: 'Lowongan Aktif' },
  { value: '200+', label: 'Perusahaan' },
  { value: '1000+', label: 'Alumni Bekerja' }
]
</script>

<template>
  <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center max-w-3xl mx-auto">
        <!-- Heading -->
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Temukan Karir Impianmu
        </h1>
        <p class="text-xl text-blue-100 mb-8">
          Platform penghubung antara siswa SMK dengan dunia industri.
          Ribuan lowongan kerja menunggumu!
        </p>

        <!-- Search Bar -->
        <div class="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 shadow-lg">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari posisi atau perusahaan..."
            class="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keyup.enter="handleSearch"
          >
          <button
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            @click="handleSearch"
          >
            Cari Lowongan
          </button>
        </div>

        <!-- Stats -->
        <div class="mt-12 grid grid-cols-3 gap-8">
          <div v-for="stat in stats" :key="stat.label">
            <p class="text-3xl font-bold">{{ stat.value }}</p>
            <p class="text-blue-200 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
