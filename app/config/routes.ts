/**
 * ============================================
 * FILE: config/routes.ts
 * ============================================
 *
 * FUNGSI:
 * Definisi semua route aplikasi dalam satu file.
 * Berguna untuk:
 * - Referensi cepat semua halaman
 * - Generate navigation menu
 * - Type-safe navigation
 *
 * CARA PAKAI:
 * ```ts
 * import { ROUTES } from '~/config/routes'
 * 
 * // Di template
 * <NuxtLink :to="ROUTES.JOBS.LIST">Lowongan</NuxtLink>
 * 
 * // Di script
 * router.push(ROUTES.JOBS.DETAIL(123))
 * ```
 *
 * ============================================
 */

// ========== ROUTE DEFINITIONS ==========
// Semua route didefinisikan di sini untuk konsistensi

export const ROUTES = {
  // Halaman Utama
  HOME: '/',

  // Lowongan Kerja
  JOBS: {
    LIST: '/jobs',
    DETAIL: (id: number | string) => `/jobs/${id}`,
    BY_CATEGORY: (category: string) => `/jobs/category/${category}`,
    SEARCH: (query: string) => `/jobs?q=${encodeURIComponent(query)}`
  },

  // Perusahaan
  COMPANIES: {
    LIST: '/companies',
    DETAIL: (id: number | string) => `/companies/${id}`
  },

  // Autentikasi
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },

  // Dashboard (setelah login)
  DASHBOARD: {
    HOME: '/dashboard',
    PROFILE: '/dashboard/profile',
    APPLICATIONS: '/dashboard/applications',
    SAVED_JOBS: '/dashboard/saved-jobs',
    SETTINGS: '/dashboard/settings'
  },

  // Halaman Statis
  STATIC: {
    ABOUT: '/about',
    CONTACT: '/contact',
    FAQ: '/faq',
    PRIVACY: '/privacy',
    TERMS: '/terms'
  }
} as const

// ========== NAVIGATION MENU ==========
// Definisi menu navigasi untuk navbar dan footer

export interface NavItem {
  label: string
  to: string
  icon?: string
  children?: NavItem[]
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Beranda', to: ROUTES.HOME },
  { label: 'Lowongan', to: ROUTES.JOBS.LIST },
  { label: 'Perusahaan', to: ROUTES.COMPANIES.LIST },
  { label: 'Tentang', to: ROUTES.STATIC.ABOUT }
]

export const FOOTER_NAV = {
  menu: [
    { label: 'Beranda', to: ROUTES.HOME },
    { label: 'Lowongan', to: ROUTES.JOBS.LIST },
    { label: 'Perusahaan', to: ROUTES.COMPANIES.LIST }
  ],
  info: [
    { label: 'Tentang Kami', to: ROUTES.STATIC.ABOUT },
    { label: 'FAQ', to: ROUTES.STATIC.FAQ },
    { label: 'Kontak', to: ROUTES.STATIC.CONTACT }
  ],
  legal: [
    { label: 'Kebijakan Privasi', to: ROUTES.STATIC.PRIVACY },
    { label: 'Syarat & Ketentuan', to: ROUTES.STATIC.TERMS }
  ]
}

// ========== BREADCRUMB HELPER ==========
// Helper untuk generate breadcrumb

export const getBreadcrumbs = (path: string): NavItem[] => {
  const breadcrumbs: NavItem[] = [{ label: 'Beranda', to: ROUTES.HOME }]

  if (path.startsWith('/jobs')) {
    breadcrumbs.push({ label: 'Lowongan', to: ROUTES.JOBS.LIST })
  }

  if (path.startsWith('/companies')) {
    breadcrumbs.push({ label: 'Perusahaan', to: ROUTES.COMPANIES.LIST })
  }

  if (path.startsWith('/dashboard')) {
    breadcrumbs.push({ label: 'Dashboard', to: ROUTES.DASHBOARD.HOME })
  }

  return breadcrumbs
}
