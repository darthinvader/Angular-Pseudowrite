import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './storage-service.service';

export const THEMES = ['light', 'dark', 'focus'];
export type Theme = 'light' | 'dark' | 'focus';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme: Theme = 'light';

  constructor(
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Safely retrieve the theme from local storage
    let savedTheme: string | null;
    try {
      savedTheme = this.localStorage.getItem('theme');
      if (savedTheme && THEMES.includes(savedTheme)) {
        this.setTheme(savedTheme as Theme);
      } else {
        this.setTheme('light');
      }
    } catch (error) {
      console.error('Error reading theme from local storage:', error);
      this.setTheme('light'); // Fallback to default theme in case of error
    }
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    this.localStorage.setItem('theme', theme);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  getCurrentTheme(): Theme {
    return this.theme;
  }
}
