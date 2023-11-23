import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookExplorerComponent } from '../book-explorer/book-explorer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, BookExplorerComponent,
  ],
  templateUrl: './Home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @Input() books: any = []
}
