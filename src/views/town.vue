<template>
  <div class="town-container">
    <div class="town-map">
      <!-- Loading indicator -->
      <div v-if="isLoading" class="loading-state">
        Loading BookTown...
      </div>

      <div 
        v-else
        v-for="npc in npcs" 
        :key="npc.id" 
        class="npc-container"
        :style="{
          left: `${npc.x}%`,
          top: `${npc.y}%`
        }"
      >
        <div 
          class="npc"
          @click.stop="toggleDialogue(npc.id)"
        >
          <img :src="getImageUrl(npc.imageUrl)" :alt="npc.name" class="npc-image" />
        </div>
        <div v-if="npc.isTalking" class="speech-bubble">
          {{ npc.quotes[npc.currentQuoteIndex] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { npcService } from '../api/npcService';
import { getImageUrl } from '@/utils/imageHelper';

interface RenderableNPC {
  id: number;
  name: string;
  imageUrl: string;
  quotes: string[];
  currentQuoteIndex: number;
  x: number;
  y: number;
  isTalking: boolean;
}

const npcs = ref<RenderableNPC[]>([]);
const isLoading = ref(true);

let moveInterval: ReturnType<typeof setInterval>;

const toggleDialogue = (id: number) => {
  const npc = npcs.value.find(n => n.id === id);
  if (npc) {
    if (!npc.isTalking) {
      // Turn on talking and show the current quote
      npc.isTalking = true;
      
      // Auto-hide after 3.5 seconds
      setTimeout(() => {
        const currentNpc = npcs.value.find(n => n.id === id);
        if (currentNpc) {
          currentNpc.isTalking = false;
          // Advance the quote to the next one, looping back if necessary
          currentNpc.currentQuoteIndex = (currentNpc.currentQuoteIndex + 1) % currentNpc.quotes.length;
        }
      }, 3500);
    }
  }
};

const moveNPCs = () => {
  npcs.value.forEach(npc => {
    // Randomly move by -5% to +5%
    const dx = (Math.random() - 0.5) * 10;
    const dy = (Math.random() - 0.5) * 10;
    
    // Clamp to map boundaries (0% to 100%)
    npc.x = Math.max(0, Math.min(100, npc.x + dx));
    npc.y = Math.max(0, Math.min(100, npc.y + dy));
  });
};

onMounted(async () => {
  try {
    const backendData = await npcService.getAllActiveCharacters();
    
    // Transform backend data array into renderable objects with coordinate states
    npcs.value = backendData.map(character => ({
      ...character,
      currentQuoteIndex: 0,
      x: Math.random() * 80 + 10, // Start between 10% and 90% space
      y: Math.random() * 80 + 10,
      isTalking: false
    }));
    
    isLoading.value = false;

    // Move NPCs every 2.5 seconds
    moveInterval = setInterval(moveNPCs, 2500);
  } catch (error) {
    console.error("Failed to load BookTown data", error);
    isLoading.value = false;
  }
});

onUnmounted(() => {
  if (moveInterval) {
    clearInterval(moveInterval);
  }
});
</script>



<style scoped lang="scss">
.town-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); // Subtract nav height
  background-color: var(--bg-main);
  padding: 2rem;
  transition: background-color 0.3s ease;
}

.town-map {
  width: 800px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  background: 
    linear-gradient(var(--grid-line) 2px, transparent 2px),
    linear-gradient(90deg, var(--grid-line) 2px, transparent 2px),
    var(--bg-map);
  background-size: 50px 50px;
  border: 4px solid var(--map-border);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.npc-container {
  position: absolute;
  /* Start transitioning the container position so the bubble follows the NPC */
  transition: top 2s linear, left 2s linear;
  transform: translate(-50%, -50%); // Center exactly on coordinates
  z-index: 10;
  
  &:hover {
    z-index: 20; // Hovered NPC should be above others
  }
}

.npc {
  width: 80px; // Larger size for full characters
  height: auto;
  cursor: pointer;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  transition: transform 0.2s ease, filter 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
  }
  
  .npc-image {
    width: 100%;
    height: auto;
    object-fit: contain; // Display full image
    display: block; // Removes minimal descender gap
  }
}

.speech-bubble {
  position: absolute;
  /* Position relatively to the container */
  bottom: 100%; // Right above the NPC
  margin-bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #333;
  width: max-content;
  max-width: 200px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  z-index: 30; // Bubbles should be top-most
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none; // Don't block clicks to things behind it

  // Speech bubble tail
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px 8px 0;
    border-style: solid;
    border-color: white transparent transparent transparent;
    display: block;
    width: 0;
  }
}


@keyframes popIn {
  0% { opacity: 0; transform: translateX(-50%) scale(0.5); }
  100% { opacity: 1; transform: translateX(-50%) scale(1); }
}
</style>
