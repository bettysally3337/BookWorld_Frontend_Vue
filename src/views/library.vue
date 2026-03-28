<template>
  <div class="library-container">
    <div class="header">
      <h2>{{ $t('library.welcomeTitle') }}</h2>
      <p>{{ $t('library.welcomeSubtitle') }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      Dusting off the shelves...
    </div>

    <!-- Bookshelf Grid -->
    <div v-else class="bookshelf">
      <div 
        v-for="book in books" 
        :key="book.id"
        class="book-spine"
        @click="selectBook(book)"
      >
        <div class="spine-content">
          <span class="book-title">{{ book.title }}</span>
          <span class="book-author">{{ book.author }}</span>
        </div>
      </div>
    </div>

    <!-- Backdrop for Side Panel -->
    <div 
      class="backdrop" 
      v-if="selectedBook" 
      @click="selectedBook = null"
    ></div>

    <!-- Detail Side Panel -->
    <aside class="side-panel" :class="{ 'is-open': selectedBook }">
      <div class="panel-header">
        <button class="close-btn" @click="selectedBook = null">&times;</button>
      </div>
      
      <div v-if="selectedBook" class="panel-content">
        <h3>{{ selectedBook.title }}</h3>
        <p class="meta">By <strong>{{ selectedBook.author }}</strong> &bull; Published {{ selectedBook.year }}</p>
        
        <div class="description">
          {{ selectedBook.description }}
        </div>

        <div class="links-section">
          <h4>{{ $t('library.externalLinks') }}</h4>
          <a v-if="selectedBook.links?.booksTw" :href="selectedBook.links.booksTw" target="_blank" rel="noopener noreferrer" class="ext-link">Buy on Books.com.tw 📖</a>
          <a v-if="selectedBook.links?.eslite" :href="selectedBook.links.eslite" target="_blank" rel="noopener noreferrer" class="ext-link">Buy on Eslite 📚</a>
          <a v-if="selectedBook.links?.penguin" :href="selectedBook.links.penguin" target="_blank" rel="noopener noreferrer" class="ext-link">Penguin Random House 🐧</a>
          <a v-if="selectedBook.links?.goodreads" :href="selectedBook.links.goodreads" target="_blank" rel="noopener noreferrer" class="ext-link">Reviews on Goodreads ⭐</a>
        </div>
      </div>
    </aside>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { npcService } from '../api/npcService';
import type { BookData } from '../api/mockData';

const books = ref<BookData[]>([]);
const isLoading = ref(true);
const selectedBook = ref<BookData | null>(null);

const selectBook = (book: BookData) => {
  selectedBook.value = book;
};

onMounted(async () => {
  try {
    // Reusing the town map's mock latency simulate for grabbing library DB info
    books.value = await npcService.fetchTownData(); 
  } catch (error) {
    console.error("Failed to load Library books", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  padding: 3rem;
  background-color: var(--bg-main);
  color: var(--text-main);
  position: relative;
  overflow-x: hidden; // Prevent scrolling when panel slides out
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-main);
  }
  
  p {
    color: var(--text-muted);
    font-size: 1.1rem;
  }
}

.bookshelf {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
}

.book-spine {
  height: 250px;
  background-color: var(--accent-color);
  border-radius: 4px 12px 12px 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  box-shadow: -2px 0 5px rgba(0,0,0,0.2), 4px 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, filter 0.3s ease;
  position: relative;

  // Book pages effect on the right edge
  &::after {
    content: '';
    position: absolute;
    right: 4px;
    top: 2px;
    bottom: 2px;
    width: 8px;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.8),
      rgba(255,255,255,0.8) 1px,
      rgba(200,200,200,0.8) 2px
    );
    border-radius: 0 8px 8px 0;
  }

  &:hover {
    transform: translateY(-10px) rotate(-2deg);
    filter: brightness(1.1);
  }

  .spine-content {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    color: #fff; // Forced white for spine contrast
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);

    .book-title {
      font-size: 1.2rem;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .book-author {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 1rem;
    }
  }
}

/* Side Panel Styles */
.backdrop {
  position: fixed;
  top: 70px; // account for nav
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
}

.side-panel {
  position: fixed;
  top: 70px; // below nav
  right: -450px; // hidden initially
  width: 400px;
  max-width: 90vw;
  height: calc(100vh - 70px);
  background-color: var(--bg-main);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
  z-index: 50;
  transition: right 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;

  &.is-open {
    right: 0;
  }

  .panel-header {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--border-color);

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: var(--text-muted);
      line-height: 1;

      &:hover {
        color: var(--text-main);
      }
    }
  }

  .panel-content {
    padding: 2rem;
    overflow-y: auto;
    
    h3 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--text-main);
    }

    .meta {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 2rem;
      border-bottom: 1px dashed var(--border-color);
      padding-bottom: 1rem;
    }

    .description {
      line-height: 1.6;
      font-size: 1.05rem;
      margin-bottom: 3rem;
      color: var(--text-main);
    }

    .links-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h4 {
        margin-bottom: 0.5rem;
        color: var(--text-muted);
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
      }

      .ext-link {
        display: block;
        padding: 1rem;
        background-color: var(--bg-secondary);
        color: var(--text-main);
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        transition: all 0.2s ease;
        border: 1px solid var(--border-color);

        &:hover {
          background-color: var(--accent-color);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
      }
    }
  }
}
</style>
