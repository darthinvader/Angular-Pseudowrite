import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faBookOpen, faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-book-title',
  standalone: true,
  imports: [
    CommonModule, FormsModule, FontAwesomeModule
  ],
  templateUrl: './book-title.component.html',
})
export class BookTitleComponent {
  @Input() bookName: string = 'Book'
  @Input() bookId?: string;
  editingTitle: boolean = false;
  originalBookName: string = ''
  faFileImport = faFileImport;
  faPlus = faPlus;
  faBookOpen = faBookOpen
  constructor(private firestoreService: FirestoreService) { }

  onTitleClick(): void {
    this.editingTitle = true;
    this.originalBookName = this.bookName; // Store the original book name
  }

  onTitleEnter(): void {
    if (!this.bookName.trim()) {
      this.bookName = this.originalBookName; // Revert to original name if empty
    }
    this.editingTitle = false;
  }

  onTitleBlur(): void {
    if (!this.bookName.trim()) {
      this.bookName = this.originalBookName; // Revert to original name if empty
    }
    this.editingTitle = false;
  }


  importFiles(): void {
    // Implement file import logic here
  }

  addNewFile(): void {
    if (!this.bookId) {
      console.error('Book ID is not provided');
      return;
    }

    this.firestoreService.createChapter(this.bookId, 'New Chapter', '').subscribe({
      next: () => console.log('New chapter added successfully'),
      error: (err: any) => console.error('Error adding new chapter:', err),
      complete: () => console.log('Completed adding new chapter'),
    });
  }
}
