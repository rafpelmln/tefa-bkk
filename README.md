# TEFA-BKK (Bursa Kerja Khusus)

Aplikasi Bursa Kerja Khusus berbasis Nuxt 4 + Vue 3 + Tailwind CSS.

---

## 📋 Requirements

### System Requirements
- **Node.js**: v18.0.0 atau lebih tinggi
- **npm**: v9.0.0 atau lebih tinggi (atau pnpm/yarn)
- **OS**: Windows, macOS, atau Linux

### Tech Stack
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Nuxt | 4.x | Framework fullstack Vue |
| Vue | 3.5+ | Reactive UI framework |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| TypeScript | 5.x | Type-safe JavaScript |
| @nuxt/ui | 4.x | Pre-built UI components |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka browser
# http://localhost:3000
```

---

## 📁 Struktur Folder

```
tefa-bkk/
├── app/
│   ├── app.vue                    # Root component aplikasi
│   ├── router.options.ts          # Konfigurasi router (scroll, behavior)
│   │
│   ├── config/                    # Konfigurasi aplikasi
│   │   └── routes.ts              # Definisi semua routes
│   │
│   ├── layouts/                   # Template layout halaman
│   │   └── default.vue            # Layout utama (navbar + footer)
│   │
│   ├── pages/                     # Halaman-halaman (auto-routing)
│   │   ├── index.vue              # Halaman beranda "/"
│   │   ├── jobs/
│   │   │   ├── index.vue          # Daftar lowongan "/jobs"
│   │   │   └── [id].vue           # Detail lowongan "/jobs/:id"
│   │   └── dashboard/
│   │       └── index.vue          # Dashboard user "/dashboard"
│   │
│   ├── components/                # UI components reusable
│   │   ├── JobCard.vue            # Card untuk menampilkan lowongan
│   │   │
│   │   └── sections/              # Section per halaman
│   │       ├── home/              # Sections untuk halaman beranda
│   │       │   ├── HeroSection.vue
│   │       │   ├── JobListSection.vue
│   │       │   ├── CategorySection.vue
│   │       │   └── CtaSection.vue
│   │       │
│   │       ├── jobs/              # Sections untuk halaman lowongan
│   │       │   ├── HeaderSection.vue
│   │       │   └── FilterSection.vue
│   │       │
│   │       └── dashboard/         # Sections untuk halaman dashboard
│   │           ├── StatsSection.vue
│   │           └── RecentApplicationsSection.vue
│   │
│   └── composables/               # Logic reusable (fetch, state)
│       └── useJobs.ts             # Composable untuk data lowongan
│
├── public/                        # Static assets
├── nuxt.config.ts                 # Konfigurasi Nuxt
├── package.json                   # Dependencies
└── README.md                      # Dokumentasi ini
```

### Penjelasan Tiap Folder

| Folder | Fungsi |
|--------|--------|
| `config/` | Konfigurasi aplikasi seperti routes, constants, dll |
| `layouts/` | Template wrapper untuk halaman. Berisi elemen yang sama di setiap halaman (navbar, sidebar, footer) |
| `pages/` | Halaman aplikasi. Nama file = route URL. `pages/index.vue` = `/`, `pages/jobs/[id].vue` = `/jobs/123` |
| `components/` | UI components yang bisa dipakai ulang. Auto-import, tidak perlu import manual |
| `components/sections/[halaman]/` | Section components per halaman. Dipanggil dengan prefix `Sections[Halaman]` |
| `composables/` | Logic reusable (fetch API, state management, utilities). Harus diawali `use` (contoh: `useJobs`) |

---

## 🧩 Struktur Sections

### Konsep
Setiap halaman punya folder sections sendiri di `components/sections/[nama-halaman]/`.
Ini membuat kode lebih terorganisir dan mudah di-maintain.

### Cara Penamaan Component
```
components/sections/[halaman]/[NamaSection].vue
↓
Sections[Halaman][NamaSection]
```

### Contoh Penggunaan
```vue
<!-- Halaman: pages/index.vue -->
<!-- Sections dari: components/sections/home/ -->

<template>
  <div>
    <SectionsHomeHeroSection @search="handleSearch" />
    <SectionsHomeJobListSection :jobs="jobs" />
    <SectionsHomeCategorySection />
    <SectionsHomeCtaSection />
  </div>
</template>
```

```vue
<!-- Halaman: pages/dashboard/index.vue -->
<!-- Sections dari: components/sections/dashboard/ -->

<template>
  <div>
    <SectionsDashboardStatsSection />
    <SectionsDashboardRecentApplicationsSection />
  </div>
</template>
```

### Daftar Sections

| Halaman | Section | Component |
|---------|---------|-----------|
| Home | Hero | `<SectionsHomeHeroSection />` |
| Home | JobList | `<SectionsHomeJobListSection />` |
| Home | Category | `<SectionsHomeCategorySection />` |
| Home | CTA | `<SectionsHomeCtaSection />` |
| Jobs | Header | `<SectionsJobsHeaderSection />` |
| Jobs | Filter | `<SectionsJobsFilterSection />` |
| Dashboard | Stats | `<SectionsDashboardStatsSection />` |
| Dashboard | Recent | `<SectionsDashboardRecentApplicationsSection />` |

---

## 🛣️ Routing

### File Konfigurasi Routes
Semua routes didefinisikan di `app/config/routes.ts`:

```typescript
import { ROUTES } from '~/config/routes'

// Navigasi ke halaman
router.push(ROUTES.HOME)                    // → /
router.push(ROUTES.JOBS.LIST)               // → /jobs
router.push(ROUTES.JOBS.DETAIL(123))        // → /jobs/123
router.push(ROUTES.AUTH.LOGIN)              // → /auth/login
```

### Auto-Routing (pages/)
| File | URL | Deskripsi |
|------|-----|-----------|
| `pages/index.vue` | `/` | Beranda |
| `pages/jobs/index.vue` | `/jobs` | Daftar lowongan |
| `pages/jobs/[id].vue` | `/jobs/:id` | Detail lowongan |

---

## 📝 Contoh Penggunaan

### 1. Menambah Halaman Baru
Buat file di `app/pages/`:
```
app/pages/about.vue     → /about
app/pages/jobs/index.vue → /jobs
app/pages/jobs/[id].vue  → /jobs/:id (dynamic route)
```

### 2. Membuat Component
Buat file di `app/components/`, otomatis bisa dipakai:
```vue
<!-- app/components/MyButton.vue -->
<template>
  <button class="bg-blue-500 text-white px-4 py-2">
    <slot />
  </button>
</template>

<!-- Pakai di halaman manapun tanpa import -->
<MyButton>Klik Saya</MyButton>
```

### 3. Membuat Composable untuk Fetch Data
```typescript
// app/composables/useCompanies.ts
export const useCompanies = () => {
  return useFetch('/api/companies')
}

// Pakai di component/page
const { data: companies } = await useCompanies()
```

---

## 🛠️ Scripts

```bash
npm run dev      # Development server (hot reload)
npm run build    # Build untuk production
npm run preview  # Preview production build
npm run generate # Generate static site
```

---

## 📚 Dokumentasi Tambahan

- [Nuxt 4 Docs](https://nuxt.com/docs)
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Nuxt UI Docs](https://ui.nuxt.com)
