import { TextGenerationService } from './../services/text-generation.service';
import { NavbarComponent } from './navbar/navbar.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { HomeComponent } from './home/Home.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BackgroundComponent, HomeComponent, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pseudowrite';
  constructor(public textGenerationService: TextGenerationService) { }

  onClick() {
    this.textGenerationService.getChatCompletions('Write a 20 word poem').subscribe((response) => {
      console.log(response)
    }
  }
}
