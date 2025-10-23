<script setup>
// 1. IMPORT TOOLS
import { ref, onMounted } from 'vue'
// useRoute digunakan untuk mendapatkan informasi tentang rute saat ini (termasuk parameter ID)
import { useRoute } from 'vue-router'
import axios from 'axios'

// 2. PERSIAPAN VARIABEL
// 'route' akan berisi informasi URL
const route = useRoute() 
// Kita buat 'ref' null. Kita akan mengisinya dengan objek film nanti.
const movieDetails = ref(null) 

// Ambil API Key Anda
const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY
// URL dasar untuk gambar (kita pakai 'w780' untuk gambar yang lebih besar)
const imageBaseUrl = 'https://image.tmdb.org/t/p/w780'

// 3. FUNGSI UNTUK MENGAMBIL DATA DETAIL
const fetchMovieDetails = async () => {
  // Ambil 'id' dari parameter URL. 
  // Ini adalah 'id' dari '/movie/:id' yang kita atur di router.
  const movieId = route.params.id

  try {
    // Panggil API, tapi kali ini ke endpoint 'movie/{movie_id}'
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    )
    
    // Hasilnya adalah satu objek film, bukan array 'results'.
    // Kita simpan seluruh objek itu ke 'ref' kita.
    movieDetails.value = response.data
    console.log(movieDetails.value) // Cek console untuk melihat datanya

  } catch (error) {
    console.error('Error fetching movie details:', error)
  }
}

// 4. JALANKAN FUNGSI SAAT KOMPONEN DIMUAT
onMounted(() => {
  fetchMovieDetails()
})
</script>

<template>
  <div class="container mt-5">
    <div v-if="!movieDetails" class="text-center">
      <h2>Loading...</h2>
    </div>

    <div v-else class="row">
      <div class="col-md-5">
        <img 
          :src="`${imageBaseUrl}${movieDetails.poster_path}`" 
          class="img-fluid rounded shadow" 
          :alt="movieDetails.title"
        >
      </div>
      <div class="col-md-7">
        <h1>{{ movieDetails.title }}</h1>
        <h5 class="text-muted fst-italic">{{ movieDetails.tagline }}</h5>
        
        <p class="mt-3">
          ⭐ **Rating:** {{ movieDetails.vote_average.toFixed(1) }} / 10
        </p>
        <p>
          **Tanggal Rilis:** {{ movieDetails.release_date }}
        </p>

        <h4 class="mt-4">Sinopsis</h4>
        <p>{{ movieDetails.overview }}</p>

        <a :href="movieDetails.homepage" target="_blank" class="btn btn-primary mt-3">
          Kunjungi Situs Web
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Style ini hanya berlaku untuk halaman ini */
.img-fluid {
  max-width: 100%;
  height: auto;
}

h1 {
  font-weight: 700;
}

h5 {
  font-weight: 400;
}
</style>