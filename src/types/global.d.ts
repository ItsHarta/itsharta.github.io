export {};

declare global {
  interface Window {
    themeMediaQueryList?: MediaQueryList;
    themeChangeListener?: (event: MediaQueryListEvent) => void;
  }
}
