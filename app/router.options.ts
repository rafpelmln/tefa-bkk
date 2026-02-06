/**
 * ============================================
 * FILE: router.options.ts
 * ============================================
 *
 * FUNGSI:
 * Konfigurasi routing custom untuk Nuxt.
 * File ini memungkinkan kita untuk:
 * - Menambah custom routes
 * - Mengubah behavior router
 * - Menambah middleware global
 *
 * CATATAN:
 * Di Nuxt, routing otomatis berdasarkan struktur folder /pages.
 * File ini untuk TAMBAHAN konfigurasi, bukan mengganti.
 *
 * STRUKTUR ROUTES:
 * /                    → Beranda
 * /jobs                → Daftar lowongan
 * /jobs/:id            → Detail lowongan
 * /companies           → Daftar perusahaan
 * /companies/:id       → Detail perusahaan
 * /auth/login          → Halaman login
 * /auth/register       → Halaman register
 * /dashboard           → Dashboard user
 * /dashboard/profile   → Profile user
 * /dashboard/applications → Lamaran user
 *
 * ============================================
 */

import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // ========== SCROLL BEHAVIOR ==========
  // Mengatur perilaku scroll saat navigasi
  scrollBehavior(to, from, savedPosition) {
    // Jika ada hash (#section), scroll ke element tersebut
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    // Jika kembali (back button), restore posisi scroll
    if (savedPosition) {
      return savedPosition
    }

    // Default: scroll ke atas
    return { top: 0, behavior: 'smooth' }
  },

  // ========== ROUTES (OPSIONAL) ==========
  // Tambahkan custom routes di sini jika diperlukan
  // Routes dari /pages akan otomatis ditambahkan
  /*
  routes: (_routes) => [
    ..._routes,
    {
      name: 'custom-route',
      path: '/custom',
      component: () => import('~/pages/custom.vue')
    }
  ]
  */
}
