import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from '../book-explorer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule, // Import FontAwesomeModule
  ],
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input() book: Book | null = null;
  faTrashAlt = faTrashAlt; // Icon property

  onDelete() { }
}
