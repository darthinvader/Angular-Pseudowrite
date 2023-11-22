import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { BackgroundComponent } from './background/background.component';
import { HomeComponent } from './home/Home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EditorComponent, ProjectComponent, LoginComponent, BackgroundComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pseudowrite';
}
