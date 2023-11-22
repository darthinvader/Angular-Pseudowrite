import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
export interface Book {
  title: string,
  imgUrl?: string,
  imgTitle?: string
}

@Component({
  selector: 'app-book-explorer',
  standalone: true,
  imports: [
    CommonModule, BookCardComponent, FontAwesomeModule
  ],
  templateUrl: './book-explorer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookExplorerComponent {
  @Input() books: Book[] = []
  faPlus = faPlus
}
