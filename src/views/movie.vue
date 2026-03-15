<template>
  <div class="movie-page">
    <div class="video-section">
      <div class="video-player">
        <div class="video-screen">
          <div class="play-button">▶</div>
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
      <div class="video-info">
        <h2>Midnight Adventure</h2>
        <p>Watching together with 12 others</p>
      </div>
    </div>
    
    <div class="sidebar">
      <div class="online-users">
        <h3>Online Viewers ({{ viewers.length }})</h3>
        <ul class="user-list">
          <li v-for="user in viewers" :key="user.id" class="user-item">
            <div class="avatar" :style="{ backgroundColor: user.color }">
              {{ user.name.charAt(0) }}
            </div>
            <span>{{ user.name }}</span>
            <span v-if="user.isHost" class="host-badge">HOST</span>
          </li>
        </ul>
      </div>
      
      <div class="chat-room">
        <h3>Live Chat</h3>
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
            placeholder="Type a message..." 
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

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

const viewers = ref<User[]>([
  { id: 1, name: 'You', color: '#3498db', isHost: true },
  { id: 2, name: 'Alice', color: '#e74c3c' },
  { id: 3, name: 'Bob', color: '#f39c12' },
  { id: 4, name: 'Charlie', color: '#9b59b6' },
  { id: 5, name: 'Diana', color: '#1abc9c' }
]);

const messages = ref<Message[]>([
  { id: 1, author: 'Alice', color: '#e74c3c', text: 'Hi everyone! Ready to watch?' },
  { id: 2, author: 'Bob', color: '#f39c12', text: 'Yes, been waiting for this!' },
  { id: 3, author: 'Charlie', color: '#9b59b6', text: 'Popcorn is ready 🍿' }
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
    color: '#3498db',
    text: newMessage.value.trim()
  });
  
  newMessage.value = '';
  scrollToBottom();
  
  // Simulate reply
  setTimeout(() => {
    messages.value.push({
      id: Date.now(),
      author: 'Diana',
      color: '#1abc9c',
      text: 'Haha, me too!'
    });
    scrollToBottom();
  }, 3000);
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped lang="scss">
.movie-page {
  display: flex;
  height: calc(100vh - 70px);
  background-color: #0f1115;
  color: #fff;
}

.video-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
}

.video-player {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  background-color: #000;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.video-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #2a2d34 0%, #000 100%);
  cursor: pointer;
  
  .play-button {
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.8);
    transition: transform 0.2s, color 0.2s;
    
    &:hover {
      transform: scale(1.1);
      color: #fff;
    }
  }
}

.video-controls {
  height: 50px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.progress-bar {
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: -2px;
  border-radius: 2px;
  cursor: pointer;
  
  .progress-fill {
    width: 30%;
    height: 100%;
    background-color: #e74c3c;
    border-radius: 2px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 12px;
      height: 12px;
      background-color: #e74c3c;
      border-radius: 50%;
    }
  }
}

.controls-row {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 0.9rem;
  color: #ccc;
  
  .spacer {
    flex: 1;
  }
}

.video-info {
  max-width: 1200px;
  margin: 1.5rem auto 0;
  width: 100%;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #95a5a6;
    font-size: 1rem;
  }
}

.sidebar {
  width: 350px;
  background-color: #1a1d24;
  border-left: 1px solid #2c313c;
  display: flex;
  flex-direction: column;
}

.online-users {
  padding: 1.5rem;
  border-bottom: 1px solid #2c313c;
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #ecf0f1;
  }
}

.user-list {
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 3px;
  }
}

.user-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.8rem;
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 0.9rem;
  }
  
  span {
    color: #cbd5e0;
    font-size: 0.95rem;
  }
  
  .host-badge {
    margin-left: auto;
    background-color: #e74c3c;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
  }
}

.chat-room {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow: hidden;
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #ecf0f1;
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 3px;
  }
}

.message {
  line-height: 1.4;
  word-break: break-word;
  
  .msg-author {
    font-weight: bold;
    margin-right: 0.4rem;
  }
  
  .msg-text {
    color: #e2e8f0;
  }
}

.chat-input-area {
  display: flex;
  gap: 0.5rem;
  
  input {
    flex: 1;
    background-color: #2d3748;
    border: 1px solid #4a5568;
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.2s;
    
    &:focus {
      border-color: #3498db;
    }
    
    &::placeholder {
      color: #a0aec0;
    }
  }
  
  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0 1.2rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>
