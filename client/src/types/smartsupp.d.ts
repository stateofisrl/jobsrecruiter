declare global {
  interface Window {
    smartsupp?: (command: string, ...args: any[]) => void;
  }
}

export {};
