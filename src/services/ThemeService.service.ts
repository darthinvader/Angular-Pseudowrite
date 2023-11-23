import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './storage-service.service';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

export const THEMES = ['light', 'dark', 'focus'];
export type Theme = 'light' | 'dark' | 'focus'


@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme: Theme = 'light';

  constructor(private localStorage: LocalStorageService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = this.localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme as Theme);
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
