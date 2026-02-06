<!--
  ============================================
  SECTION: jobs/FilterSection.vue
  ============================================
  
  LOKASI: components/sections/jobs/
  HALAMAN: Daftar Lowongan (pages/jobs/index.vue)
  
  FUNGSI:
  Sidebar filter untuk halaman daftar lowongan.
  
  CARA PAKAI:
  ```vue
  <SectionsJobsFilterSection 
    v-model:search="searchQuery"
    v-model:type="selectedType"
    v-model:location="selectedLocation"
    :job-types="jobTypes"
    :locations="locations"
    @reset="handleReset"
  />
  ```
  
  ============================================
-->
<script setup lang="ts">
// ========== PROPS ==========
interface Props {
  jobTypes: string[]
  locations: string[]
}

defineProps<Props>()

// ========== V-MODEL ==========
const search = defineModel<string>('search', { default: '' })
const type = defineModel<string>('type', { default: '' })
const location = defineModel<string>('location', { default: '' })

// ========== EMITS ==========
const emit = defineEmits<{
  reset: []
}>()

// ========== METHODS ==========
const handleReset = () => {
  search.value = ''
  type.value = ''
  location.value = ''
  emit('reset')
}
</script>

<template>
  <aside class="lg:w-64 flex-shrink-0">
    <div class="bg-white rounded-xl p-6 shadow-sm sticky top-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold text-gray-900">Filter</h2>
        <button
          class="text-sm text-blue-600 hover:text-blue-700"
          @click="handleReset"
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
          v-model="search"
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
          v-model="type"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua Tipe</option>
          <option v-for="t in jobTypes" :key="t" :value="t">
            {{ t }}
          </option>
        </select>
      </div>

      <!-- Location Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Lokasi
        </label>
        <select
          v-model="location"
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
</template>
