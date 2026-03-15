<template>
  <div class="app-layout">
    <NavBar 
      v-model="activeTab" 
      :isDarkMode="isDarkMode" 
      @toggle-theme="toggleTheme" 
    />
    <main class="content-area">
      <MovieView v-if="activeTab === 'movie'" />
      <TownMap v-if="activeTab === 'bookTown'" />
      <LibraryView v-if="activeTab === 'library'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from './components/nav.vue';
import TownMap from './views/town.vue';
import MovieView from './views/movie.vue';
import LibraryView from './views/library.vue';

const activeTab = ref('bookTown');
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
};

onMounted(() => {
  // Initialize to light default
  document.documentElement.setAttribute('data-theme', 'light');
});
</script>

<style lang="scss">
.placeholder-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-main);
  }
}
</style>
