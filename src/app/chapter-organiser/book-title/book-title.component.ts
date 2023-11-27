import { Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faBookOpen, faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirestoreService } from '../../../services/firestore.service';
import { Book } from '../../../models/Book'; // Import the Book model

@Component({
  selector: 'app-book-title',
  standalone: true,
  imports: [
    CommonModule, FormsModule, FontAwesomeModule
  ],
  templateUrl: './book-title.component.html',
})
export class BookTitleComponent {
  @Input() book: Book = { id: '', title: '' }; // Single input for the book
  editingTitle: boolean = false;
  originalBookName: string = '';
  faFileImport = faFileImport;
  faPlus = faPlus;
  faBookOpen = faBookOpen;

  constructor(private firestoreService: FirestoreService) { }

  onTitleClick(): void {
    this.editingTitle = true;
    this.originalBookName = this.book?.title ?? ''; // Store the original book name
  }

  onTitleEnter(): void {
    this.updateTitle();
  }

  onTitleBlur(): void {
    this.updateTitle();
  }

  private updateTitle(): void {
    if (this.book?.title && this.book?.title.trim() && this.book?.title !== this.originalBookName) {
      this.firestoreService.writeBook(this.book?.id, this.book.title).subscribe({
        next: () => console.log('Book title updated successfully'),
        error: (err: any) => console.error('Error updating book title:', err),
        complete: () => console.log('Completed updating book title'),
      });
    } else {
      this.book.title = this.originalBookName; // Revert to original name if empty or unchanged
    }
    this.editingTitle = false;
  }

  importFiles(): void {
    // Implement file import logic here
  }

  addNewFile(): void {
    if (!this.book?.id) {
      console.error('Book ID is not provided');
      return;
    }

    this.firestoreService.createChapter(this.book.id, 'New Chapter', '').subscribe({
      next: () => console.log('New chapter added successfully'),
      error: (err: any) => console.error('Error adding new chapter:', err),
      complete: () => console.log('Completed adding new chapter'),
    });
  }
}
