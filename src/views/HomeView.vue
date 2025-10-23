<script setup>
// 1. IMPORT TOOLS
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 2. PERSIAPAN VARIABEL
const popularMovies = ref([]) 
const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

// --- Variabel BARU untuk Pencarian ---
// ref untuk menyimpan apa yang diketik pengguna
const searchQuery = ref('') 
// ref untuk menyimpan hasil pencarian
const searchResults = ref([]) 
// ------------------------------------

// 3. FUNGSI UNTUK MENGAMBIL DATA POPULER (Tidak berubah)
const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    )
    popularMovies.value = response.data.results
  } catch (error) {
    console.error('Error fetching popular movies:', error)
  }
}

// --- Fungsi BARU untuk Pencarian ---
const searchMovies = async () => {
  // Jika kotak pencarian kosong, kita bersihkan hasil 
  // dan tampilkan film populer lagi.
  if (searchQuery.value.trim() === '') {
    searchResults.value = []
    return // Hentikan fungsi
  }

  try {
    // Panggil API, kali ini ke endpoint '/search/movie'
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery.value}&page=1`
    )
    // Simpan hasilnya ke ref searchResults
    searchResults.value = response.data.results
    console.log("Search results:", searchResults.value)
  } catch (error) {
    console.error('Error searching movies:', error)
  }
}
// ----------------------------------

// 4. JALANKAN FUNGSI SAAT KOMPONEN DIMUAT
onMounted(() => {
  fetchPopularMovies()
})
</script>

<template>
  <main class="container mt-4">

    <form @submit.prevent="searchMovies" class="mb-4">
      <div class="input-group">
        <input 
          type="text" 
          v-model="searchQuery"
          class="form-control" 
          placeholder="Cari film..."
        >
        <button type="submit" class="btn btn-primary">Cari</button>
      </div>
    </form>
    <div v-if="searchResults.length > 0">
      <h1 class="mb-4">Hasil Pencarian untuk "{{ searchQuery }}"</h1>
      <div class="row">
        <div 
          v-for="movie in searchResults" 
          :key="movie.id" 
          class="col-md-3 col-sm-6 mb-4"
        >
          <RouterLink 
            :to="`/movie/${movie.id}`" 
            class="card text-decoration-none text-dark h-100"
          >
            <img 
              :src="`${imageBaseUrl}${movie.poster_path}`" 
              class="card-img-top" 
              :alt="movie.title"
              onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'"
            >
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">
                <small class="text-muted">Rilis: {{ movie.release_date }}</small>
              </p>
              <p class="card-text">
                Rating: ⭐ {{ movie.vote_average.toFixed(1) }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <div v-else>
      <h1 class="mb-4">Film Terpopuler Saat Ini</h1>
      <div class="row">
        <div 
          v-for="movie in popularMovies" 
          :key="movie.id" 
          class="col-md-3 col-sm-6 mb-4"
        >
          <RouterLink 
            :to="`/movie/${movie.id}`" 
            class="card text-decoration-none text-dark h-100"
          >
            <img 
              :src="`${imageBaseUrl}${movie.poster_path}`" 
              class="card-img-top" 
              :alt="movie.title"
            >
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">
                <small class="text-muted">Rilis: {{ movie.release_date }}</small>
              </p>
              <p class="card-text">
                Rating: ⭐ {{ movie.vote_average.toFixed(1) }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
/* Style ini tidak berubah, tapi saya tambahkan sedikit 
  untuk gambar yang error
*/
.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .card-img-top {
    aspect-ratio: 2/3; /* Jaga rasio gambar */
    object-fit: cover;  /* Pastikan gambar mengisi kartu */
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>