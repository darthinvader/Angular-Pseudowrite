import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookExplorerComponent } from '../book-explorer/book-explorer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, NavbarComponent, BookExplorerComponent,
  ],
  templateUrl: './Home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @Input() books: any = []
}
