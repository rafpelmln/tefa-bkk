<!--
  ============================================
  SECTION: dashboard/RecentApplicationsSection.vue
  ============================================
  
  LOKASI: components/sections/dashboard/
  HALAMAN: Dashboard (pages/dashboard/index.vue)
  
  FUNGSI:
  Menampilkan daftar lamaran terbaru user.
  
  CARA PAKAI:
  ```vue
  <SectionsDashboardRecentApplicationsSection :applications="recentApps" />
  ```
  
  ============================================
-->
<script setup lang="ts">
// ========== TYPES ==========
interface Application {
  id: number
  jobTitle: string
  company: string
  appliedAt: string
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted'
}

// ========== PROPS ==========
interface Props {
  applications?: Application[]
}

const props = withDefaults(defineProps<Props>(), {
  applications: () => [
    { id: 1, jobTitle: 'Frontend Developer', company: 'PT Teknologi', appliedAt: '2026-02-05', status: 'reviewed' },
    { id: 2, jobTitle: 'UI Designer', company: 'Creative Studio', appliedAt: '2026-02-03', status: 'pending' },
    { id: 3, jobTitle: 'Admin Staff', company: 'CV Maju', appliedAt: '2026-02-01', status: 'interview' }
  ]
})

// ========== COMPUTED ==========
const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  interview: 'bg-purple-100 text-purple-700',
  rejected: 'bg-red-100 text-red-700',
  accepted: 'bg-green-100 text-green-700'
}

const statusLabels: Record<string, string> = {
  pending: 'Menunggu',
  reviewed: 'Dilihat',
  interview: 'Interview',
  rejected: 'Ditolak',
  accepted: 'Diterima'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Lamaran Terbaru</h2>
      <NuxtLink to="/dashboard/applications" class="text-blue-600 text-sm hover:text-blue-700">
        Lihat Semua →
      </NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Posisi</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Perusahaan</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Tanggal</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="app in applications" :key="app.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 font-medium text-gray-900">{{ app.jobTitle }}</td>
            <td class="px-4 py-3 text-gray-600">{{ app.company }}</td>
            <td class="px-4 py-3 text-gray-500 text-sm">{{ formatDate(app.appliedAt) }}</td>
            <td class="px-4 py-3">
              <span
                :class="statusColors[app.status]"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ statusLabels[app.status] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
