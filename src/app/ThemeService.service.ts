
import { Injectable } from '@angular/core';
export const THEMES = ['light', 'dark', 'focus'];
export type Theme = 'light' | 'dark' | 'focus'


@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme: Theme = 'light';

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.setTheme(savedTheme as Theme);
  }

  setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  getCurrentTheme(): Theme {
    return this.theme;
  }
}
