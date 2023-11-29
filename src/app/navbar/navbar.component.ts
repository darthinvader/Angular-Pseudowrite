import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, LoginComponent, ThemeSwitchComponent, RouterModule, ButtonComponent
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { }
