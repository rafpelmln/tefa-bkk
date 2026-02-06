<!--
  ============================================
  SECTION: dashboard/StatsSection.vue
  ============================================
  
  LOKASI: components/sections/dashboard/
  HALAMAN: Dashboard (pages/dashboard/index.vue)
  
  FUNGSI:
  Menampilkan statistik ringkasan untuk user di dashboard.
  
  CARA PAKAI:
  ```vue
  <SectionsDashboardStatsSection :stats="userStats" />
  ```
  
  ============================================
-->
<script setup lang="ts">
// ========== PROPS ==========
interface StatItem {
  label: string
  value: number | string
  icon: string
  color: string
}

interface Props {
  stats?: StatItem[]
}

const props = withDefaults(defineProps<Props>(), {
  stats: () => [
    { label: 'Lamaran Terkirim', value: 12, icon: '📤', color: 'bg-blue-100 text-blue-600' },
    { label: 'Dilihat Perusahaan', value: 8, icon: '👁️', color: 'bg-green-100 text-green-600' },
    { label: 'Interview', value: 3, icon: '🎯', color: 'bg-purple-100 text-purple-600' },
    { label: 'Lowongan Disimpan', value: 5, icon: '❤️', color: 'bg-pink-100 text-pink-600' }
  ]
})
</script>

<template>
  <section class="mb-8">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-4 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div :class="[stat.color, 'w-10 h-10 rounded-lg flex items-center justify-center text-xl']">
            {{ stat.icon }}
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
