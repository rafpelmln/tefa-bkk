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
│   ├── app.vue              # Root component aplikasi
│   ├── layouts/             # Template layout halaman
│   │   └── default.vue      # Layout utama (navbar + footer)
│   ├── pages/               # Halaman-halaman (auto-routing)
│   │   └── index.vue        # Halaman utama "/"
│   ├── components/          # UI components reusable
│   │   └── JobCard.vue      # Card untuk menampilkan lowongan
│   └── composables/         # Logic reusable (fetch, state)
│       └── useJobs.ts       # Composable untuk fetch data lowongan
├── public/                  # Static assets
├── nuxt.config.ts           # Konfigurasi Nuxt
├── package.json             # Dependencies
└── README.md                # Dokumentasi ini
```

### Penjelasan Tiap Folder

| Folder | Fungsi |
|--------|--------|
| `layouts/` | Template wrapper untuk halaman. Berisi elemen yang sama di setiap halaman (navbar, sidebar, footer) |
| `pages/` | Halaman aplikasi. Nama file = route URL. `pages/index.vue` = `/`, `pages/jobs/[id].vue` = `/jobs/123` |
| `components/` | UI components yang bisa dipakai ulang. Auto-import, tidak perlu import manual |
| `composables/` | Logic reusable (fetch API, state management, utilities). Harus diawali `use` (contoh: `useJobs`) |

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
