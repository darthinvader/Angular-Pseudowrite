import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRobot, faCircleNotch, faBrain, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule
  ],
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  faRobot = faRobot;
  faBrain = faBrain
  faUsers = faUsers
  faBook = faBook
}
