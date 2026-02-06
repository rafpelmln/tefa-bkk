<!--
  ============================================
  SECTION: CategorySection.vue
  ============================================
  
  FUNGSI:
  Section untuk menampilkan kategori lowongan.
  Berdasarkan jurusan SMK.
  
  CARA PAKAI:
  ```vue
  <CategorySection @category-click="handleCategoryClick" />
  ```
  
  ============================================
-->
<script setup lang="ts">
import { ROUTES } from '~/config/routes'

// ========== EMITS ==========
const emit = defineEmits<{
  categoryClick: [category: string]
}>()

// ========== DATA ==========
// Daftar kategori berdasarkan jurusan SMK
const categories = [
  { id: 'it', nama: 'IT & Software', icon: '💻', jumlah: 120 },
  { id: 'administrasi', nama: 'Administrasi', icon: '📋', jumlah: 85 },
  { id: 'teknik', nama: 'Teknik', icon: '⚙️', jumlah: 95 },
  { id: 'desain', nama: 'Desain', icon: '🎨', jumlah: 60 },
  { id: 'marketing', nama: 'Marketing', icon: '📢', jumlah: 45 },
  { id: 'akuntansi', nama: 'Akuntansi', icon: '📊', jumlah: 70 },
  { id: 'kesehatan', nama: 'Kesehatan', icon: '🏥', jumlah: 55 },
  { id: 'lainnya', nama: 'Lainnya', icon: '📁', jumlah: 40 }
]

// ========== METHODS ==========
const handleClick = (categoryId: string) => {
  emit('categoryClick', categoryId)
}
</script>

<template>
  <section class="py-16 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-gray-900">Kategori Populer</h2>
        <p class="text-gray-600 mt-2">Pilih sesuai jurusanmu</p>
      </div>

      <!-- Category Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="kategori in categories"
          :key="kategori.id"
          class="bg-white rounded-xl p-6 text-center cursor-pointer hover:shadow-md hover:border-blue-200 border border-transparent transition-all"
          @click="handleClick(kategori.id)"
        >
          <span class="text-4xl">{{ kategori.icon }}</span>
          <h3 class="font-semibold text-gray-900 mt-3">{{ kategori.nama }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ kategori.jumlah }} lowongan</p>
        </button>
      </div>
    </div>
  </section>
</template>
