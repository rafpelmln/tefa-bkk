<!--
  ============================================
  SECTION: CtaSection.vue
  ============================================
  
  FUNGSI:
  Call-to-action section untuk mendorong user daftar.
  
  CARA PAKAI:
  ```vue
  <CtaSection />
  ```
  
  ============================================
-->
<script setup lang="ts">
import { ROUTES } from '~/config/routes'
</script>

<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 class="text-3xl font-bold mb-4">
          Siap Memulai Karirmu?
        </h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto">
          Daftar sekarang dan dapatkan akses ke ribuan lowongan kerja dari perusahaan terpercaya.
          Gratis dan mudah!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            :to="ROUTES.AUTH.REGISTER"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Daftar Sebagai Pencari Kerja
          </NuxtLink>
          <NuxtLink
            :to="ROUTES.AUTH.REGISTER + '?type=company'"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Daftar Sebagai Perusahaan
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
