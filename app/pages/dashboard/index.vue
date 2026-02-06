<!--
  ============================================
  FILE: pages/dashboard/index.vue
  ============================================
  
  FUNGSI:
  Halaman dashboard user setelah login (route: /dashboard)
  
  STRUKTUR SECTIONS:
  Halaman ini menggunakan sections dari folder:
  /components/sections/dashboard/
  
  SECTIONS YANG DIGUNAKAN:
  1. StatsSection            - Statistik ringkasan
  2. RecentApplicationsSection - Lamaran terbaru
  
  ============================================
-->
<script setup lang="ts">
import { ROUTES } from '~/config/routes'

// ========== META ==========
useSeoMeta({
  title: 'Dashboard - Bursa Kerja Khusus'
})

// ========== DATA ==========
// Data user (nanti dari API/auth)
const user = ref({
  name: 'John Doe',
  email: 'john@example.com'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl font-bold text-gray-900">
          Selamat datang, {{ user.name }}! 👋
        </h1>
        <p class="text-gray-600 mt-1">
          Pantau perkembangan lamaranmu di sini.
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!--
        ========================================
        SECTIONS DASHBOARD
        ========================================
        Semua section untuk dashboard ada di:
        /components/sections/dashboard/
        
        Penamaan component: SectionsDashboard[NamaSection]
        ========================================
      -->

      <!-- 1. Stats Section -->
      <SectionsDashboardStatsSection />

      <!-- 2. Recent Applications Section -->
      <SectionsDashboardRecentApplicationsSection />
    </div>
  </div>
</template>
