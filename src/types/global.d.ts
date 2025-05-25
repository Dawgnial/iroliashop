
declare global {
  interface Window {
    addToRecentlyViewed?: (productId: string) => void;
  }
}

export {};
