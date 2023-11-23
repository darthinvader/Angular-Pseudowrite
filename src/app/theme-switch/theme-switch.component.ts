import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService, Theme, THEMES } from '../ThemeService.service';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './theme-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitchComponent {
  themes = THEMES
  constructor(public themeService: ThemeService) {

  }
  onThemeChange(value: Theme | null) {
    if (value) this.themeService.setTheme(value)
  }
}
