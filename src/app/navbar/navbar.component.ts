import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginComponent, ThemeSwitchComponent, RouterModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  isBookPage: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isBookPage = this.router.url.startsWith('/book/');
        this.cd.markForCheck()
      }
    });
  }

}
