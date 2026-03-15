<template>
  <nav class="main-nav">
    <div class="nav-brand">BookWorld</div>
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: modelValue === 'movie' }"
        @click="$emit('update:modelValue', 'movie')"
      >
        Movie
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: modelValue === 'bookTown' }"
        @click="$emit('update:modelValue', 'bookTown')"
      >
        BookTown
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: modelValue === 'library' }"
        @click="$emit('update:modelValue', 'library')"
      >
        Library
      </button>
      <button 
        class="theme-toggle"
        @click="$emit('toggle-theme')"
        :title="isDarkMode ? 'Switch to Morning' : 'Switch to Night'"
      >
        {{ isDarkMode ? '🌙' : '☕' }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string,
  isDarkMode: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'toggle-theme'): void
}>()
</script>

<style scoped lang="scss">
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--bg-nav);
  color: var(--text-main);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;

  .nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .nav-tabs {
    display: flex;
    gap: 1rem;
    align-items: center;

    .nav-tab {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-weight: 600;

      &:hover {
        color: var(--text-main);
        background-color: var(--bg-secondary);
      }

      &.active {
        color: var(--text-main);
        background-color: var(--nav-active);
        box-shadow: inset 0 -3px 0 var(--accent-color);
      }
    }
    
    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      border-radius: 50%;
      margin-left: 1rem;
      transition: transform 0.3s ease, background-color 0.3s ease;
      
      &:hover {
        background-color: var(--bg-secondary);
        transform: scale(1.1);
      }
    }
  }
}
</style>
