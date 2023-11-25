import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirestoreService } from '../../services/firestore.service';
import { Book, FirebaseBook } from '../../models/Book';
import { randomUUID } from 'crypto';
@Component({
  selector: 'app-book-explorer',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-explorer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookExplorerComponent {
  @Input() books: Book[] = [];
  faPlus = faPlus;

  constructor(private firestore: FirestoreService) { 
    firestore.fetchBookIds()
  }

  addNewBook() {
    const newBookData: FirebaseBook = { title: `New Book Title`, chapterIds: [], chapterTitles: [] };
    console.log('Adding new book:', newBookData);
    this.firestore.saveBook(null, newBookData).subscribe({
      next: () => console.log('New book added successfully'),
      error: (err) => console.error('Error adding new book:', err),
      complete: () => console.log('Completed adding new book'),
    });
  }
}
