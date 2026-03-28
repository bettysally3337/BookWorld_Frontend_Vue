<template>
  <div class="movie-page">
    <!-- Left Section: Screen & Seating -->
    <div class="theater-area">
      <div class="screen-section">
        <div class="video-player">
          <div class="video-screen">
            <div class="play-button">▶</div>
            <div class="screen-glow"></div>
          </div>
          <div class="video-controls">
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="controls-row">
              <span>00:00 / 02:30</span>
              <div class="spacer"></div>
              <span>⚙️ 🔲</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Seating Area (Audience) -->
      <div class="seating-section">
        <div class="seating-grid">
          <div v-for="npc in npcs" :key="npc.id" class="seat-container">
            <div class="audience-member">
              <img :src="getImageUrl(npc.imageUrl)" :alt="npc.name" class="npc-head" />
            </div>
            <div class="seat-chair"></div>
          </div>
        </div>
        <div class="floor-shadow"></div>
      </div>
    </div>
    
    <!-- Right Section: Chatroom -->
    <aside class="chat-sidebar">
      <div class="chat-header">
        <h3>{{ $t('movie.liveChat') }}</h3>
        <span class="viewer-count">{{ $t('movie.watching', { count: viewers.length }) }}</span>
      </div>
      
      <div class="chat-messages" ref="chatBox">
        <div v-for="msg in messages" :key="msg.id" class="message">
          <span class="msg-author" :style="{ color: msg.color }">{{ msg.author }}:</span>
          <span class="msg-text">{{ msg.text }}</span>
        </div>
      </div>

      <div class="chat-input-area">
        <input 
          v-model="newMessage" 
          type="text" 
          :placeholder="$t('movie.placeholder')" 
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">{{ $t('movie.send') }}</button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { npcService } from '../api/npcService';
import { getImageUrl } from '@/utils/imageHelper';
import type { NPCData } from '../api/mockData';

interface User {
  id: number;
  name: string;
  color: string;
  isHost?: boolean;
}

interface Message {
  id: number;
  author: string;
  color: string;
  text: string;
}

const npcs = ref<NPCData[]>([]);
const viewers = ref<User[]>([
  { id: 1, name: 'You', color: 'var(--accent-color)', isHost: true },
  { id: 2, name: 'Alice', color: '#e74c3c' },
  { id: 3, name: 'Bob', color: '#f39c12' },
  { id: 4, name: 'Charlie', color: '#9b59b6' },
  { id: 5, name: 'Diana', color: '#1abc9c' }
]);

const messages = ref<Message[]>([
  { id: 1, author: 'Alice', color: '#e74c3c', text: 'Hi everyone! Ready to watch?' },
  { id: 2, author: 'Bob', color: '#f39c12', text: 'Classic movie time! 🎥' },
  { id: 3, author: 'Charlie', color: '#9b59b6', text: 'The seating is cozy!' }
]);

const newMessage = ref('');
const chatBox = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  messages.value.push({
    id: Date.now(),
    author: 'You',
    color: 'var(--accent-color)',
    text: newMessage.value.trim()
  });
  
  newMessage.value = '';
  scrollToBottom();
  
  setTimeout(() => {
    messages.value.push({
      id: Date.now(),
      author: 'Diana',
      color: '#1abc9c',
      text: 'Totally agree!'
    });
    scrollToBottom();
  }, 2000);
};

onMounted(async () => {
  try {
    npcs.value = await npcService.getAllActiveCharacters();
  } catch (error) {
    console.error("Failed to fetch NPCs for seating", error);
  }
  scrollToBottom();
});
</script>

<style scoped lang="scss">
.movie-page {
  display: flex;
  height: calc(100vh - 70px);
  background-color: var(--bg-main);
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.theater-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at center top, var(--bg-secondary) 0%, var(--bg-main) 100%);
  position: relative;
  overflow-y: auto;
}

.screen-section {
  padding: 3rem 4rem 1rem;
  display: flex;
  justify-content: center;
}

.video-player {
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  background-color: #000;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
  border: 4px solid #111;
  overflow: hidden;
}

.video-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  position: relative;
  cursor: pointer;

  .play-button {
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.4);
    z-index: 2;
    transition: all 0.2s;
    &:hover {
      color: #fff;
      transform: scale(1.1);
    }
  }

  .screen-glow {
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 100px;
    background: linear-gradient(to top, rgba(255,255,255,0.05), transparent);
    filter: blur(20px);
    pointer-events: none;
  }
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem 0.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: #ccc;
  font-size: 0.8rem;
}

.progress-bar {
  height: 4px;
  background: rgba(255,255,255,0.2);
  margin-bottom: 0.5rem;
  cursor: pointer;
  .progress-fill {
    height: 100%;
    width: 35%;
    background-color: var(--accent-color);
  }
}

.controls-row {
  display: flex;
  align-items: center;
  .spacer { flex: 1; }
}

/* Seating Section */
.seating-section {
  margin-top: 2rem;
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.seating-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Two rows of 4
  gap: 2rem 3rem;
  max-width: 800px;
  z-index: 5;
}

.seat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.audience-member {
  width: 60px;
  height: 60px;
  margin-bottom: -10px;
  position: relative;
  z-index: 2;
  
  .npc-head {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 50% 50% 10px 10px;
    filter: brightness(0.7) drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    transition: filter 0.3s;

    &:hover {
      filter: brightness(1);
    }
  }
}

.seat-chair {
  width: 70px;
  height: 40px;
  background-color: var(--bg-nav);
  border-radius: 10px 10px 2px 2px;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.2);
  border: 1px solid var(--border-color);
  position: relative;

  &::before { // Chair back
    content: '';
    position: absolute;
    bottom: 100%;
    left: 5px;
    right: 5px;
    height: 35px;
    background-color: var(--bg-nav);
    border-radius: 8px 8px 0 0;
    border: 1px solid var(--border-color);
    border-bottom: none;
  }
}

.floor-shadow {
  position: absolute;
  top: 50%;
  width: 90%;
  height: 100px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, transparent 70%);
  pointer-events: none;
}

/* Chat Sidebar */
.chat-sidebar {
  width: 320px;
  background-color: var(--bg-secondary);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

.chat-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  h3 { color: var(--text-main); margin-bottom: 0.2rem; }
  .viewer-count { color: var(--text-muted); font-size: 0.8rem; }
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 2px; }
}

.message {
  font-size: 0.95rem;
  line-height: 1.4;
  .msg-author { font-weight: bold; margin-right: 0.5rem; }
  .msg-text { color: var(--text-main); }
}

.chat-input-area {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  background-color: var(--bg-main);
  border-top: 1px solid var(--border-color);

  input {
    flex: 1;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    padding: 0.6rem 1rem;
    border-radius: 20px;
    color: var(--text-main);
    outline: none;
    &::placeholder { color: var(--text-muted); }
  }

  button {
    background-color: var(--accent-color);
    color: white;
    padding: 0 1rem;
    border-radius: 20px;
    font-weight: bold;
    &:hover { background-color: var(--accent-hover); }
  }
}
</style>

