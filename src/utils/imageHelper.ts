/**
 * Resolves a dynamic image filename to its full asset URL.
 * Works with the project's @/assets/images filesystem structure.
 */
export function getImageUrl(name: string) {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
}
