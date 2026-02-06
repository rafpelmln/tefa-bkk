<!--
  ============================================
  FILE: layouts/default.vue
  ============================================
  
  FUNGSI:
  Layout adalah "wrapper" atau "bungkus" untuk halaman.
  Semua halaman yang pakai layout ini akan punya navbar dan footer yang sama.
  
  CARA KERJA:
  - <slot /> = tempat konten halaman ditampilkan
  - Layout ini otomatis dipakai kalau tidak ada layout lain yang di-set
  
  CARA PAKAI LAYOUT LAIN:
  Di halaman, tambahkan:
  <script setup>
  definePageMeta({
    layout: 'admin'  // pakai layouts/admin.vue
  })
  </script>
  
  ============================================
-->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- 
      ========== NAVBAR ==========
      Navigasi utama aplikasi. Tampil di semua halaman.
    -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">BK</span>
            </div>
            <span class="font-bold text-xl text-gray-900">Bursa Kerja</span>
          </NuxtLink>

          <!-- Menu Navigasi -->
          <div class="hidden md:flex items-center gap-6">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Beranda
            </NuxtLink>
            <NuxtLink 
              to="/jobs" 
              class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Lowongan
            </NuxtLink>
            <NuxtLink 
              to="/companies" 
              class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Perusahaan
            </NuxtLink>
          </div>

          <!-- Tombol CTA -->
          <div class="flex items-center gap-3">
            <button class="text-gray-600 hover:text-blue-600 font-medium">
              Masuk
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Daftar
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- 
      ========== KONTEN HALAMAN ==========
      <slot /> akan diganti dengan konten dari halaman (pages/*.vue)
    -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 
      ========== FOOTER ==========
      Footer tampil di semua halaman.
    -->
    <footer class="bg-gray-900 text-gray-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Info Aplikasi -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Bursa Kerja Khusus</h3>
            <p class="text-sm">
              Platform penghubung antara siswa SMK dengan dunia industri.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-white font-semibold mb-4">Menu</h4>
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/" class="hover:text-white">Beranda</NuxtLink></li>
              <li><NuxtLink to="/jobs" class="hover:text-white">Lowongan</NuxtLink></li>
              <li><NuxtLink to="/companies" class="hover:text-white">Perusahaan</NuxtLink></li>
            </ul>
          </div>

          <!-- Kontak -->
          <div>
            <h4 class="text-white font-semibold mb-4">Kontak</h4>
            <ul class="space-y-2 text-sm">
              <li>Email: info@bkk.sch.id</li>
              <li>Telp: (021) 123-4567</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Bursa Kerja Khusus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
