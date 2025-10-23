<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Movie App</RouterLink>
        
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>
/* Style di sini (tanpa 'scoped') berlaku global.
  Kita tambahkan sedikit padding agar konten tidak menempel di bawah navbar.
*/
body {
  padding-bottom: 50px;
}

/* Kita pindahkan style ini dari App.vue asli 
  agar <RouterView> tidak terdesentrasi
*/
main {
  padding-top: 1.5rem;
}
</style>