import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from '../book-explorer.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input() book: Book | null = null
}
