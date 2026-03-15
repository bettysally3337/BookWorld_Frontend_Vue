import type { BookData, NPCData } from './mockData';
import { bookMockData } from './mockData';

export const npcService = {
    /**
     * Simulates fetching all categorized book data from a backend server.
     */
    async fetchTownData(): Promise<BookData[]> {
        return new Promise((resolve) => {
            // Synthetic delay to simulate network latency
            setTimeout(() => resolve([...bookMockData]), 500);
        });
    },

    /**
     * Helper function to extract and flatten all characters from all books
     * into a single array, useful for populating the town map directly.
     */
    async getAllActiveCharacters(): Promise<NPCData[]> {
        const books = await this.fetchTownData();
        let allCharacters: NPCData[] = [];

        books.forEach(book => {
            allCharacters = allCharacters.concat(book.characters);
        });

        return allCharacters;
    }
};
