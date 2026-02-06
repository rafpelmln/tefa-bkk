<!--
  ============================================
  FILE: app.vue
  ============================================
  
  FUNGSI:
  Root component aplikasi. Ini adalah entry point Vue.
  
  PENJELASAN:
  - <NuxtLayout> = Wrapper untuk layout (layouts/*.vue)
  - <NuxtPage /> = Tempat halaman ditampilkan (pages/*.vue)
  
  ============================================
-->
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

