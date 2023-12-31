import { Input, Component, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faBookOpen, faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirestoreService } from '../../../services/firestore.service';
import { Book } from '../../../models/Book';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-book-title',
  standalone: true,
  imports: [
    CommonModule, FormsModule, FontAwesomeModule, ButtonComponent
  ],
  templateUrl: './book-title.component.html',
})
export class BookTitleComponent {
  @Input() book: Book = { id: '', title: '' };
  editingTitle: boolean = false;
  editableTitle: string = '';
  originalBookName: string = '';
  isCreatingChapter: boolean = false;
  faFileImport = faFileImport;
  faPlus = faPlus;
  faBookOpen = faBookOpen;
  @ViewChild('titleInput') titleInput?: ElementRef;
  @Output() newChapterCreating = new EventEmitter<boolean>();
  constructor(
    private firestoreService: FirestoreService,
    private cd: ChangeDetectorRef
  ) { }

  onTitleClick(): void {
    this.editingTitle = true;
    this.editableTitle = this.book.title;
    this.originalBookName = this.book.title;
    setTimeout(() => {
      if (this.titleInput) {
        this.titleInput.nativeElement.focus();
      }
    }, 0);
  }

  onEscapePress(): void {
    this.editableTitle = this.originalBookName;
    this.editingTitle = false;
  }

  onTitleEnter(): void {
    this.updateTitle();
  }

  private updateTitle(): void {
    if (this.editableTitle.trim() && this.editableTitle !== this.originalBookName) {
      this.firestoreService.writeBook(this.book.id, this.editableTitle).subscribe({
        next: () => {
          console.log('Book title updated successfully');
          this.book.title = this.editableTitle;
          this.cd.markForCheck();
        },
        error: (err: any) => {
          console.error('Error updating book title:', err);
          this.book.title = this.originalBookName;
          this.cd.markForCheck();
        }
      });
    }
    this.editingTitle = false;
  }

  importFiles(): void {
    // Implement file import logic here
  }

  addNewFile(): void {
    if (!this.book.id) {
      console.error('Book ID is not provided');
      return;
    }

    this.isCreatingChapter = true;
    this.newChapterCreating.emit(true); // Emit event

    this.firestoreService.createChapter(this.book.id, 'New Chapter', '').subscribe({
      next: (chapterId) => {
        console.log('New chapter added successfully, ID:', chapterId);
      },
      error: (err: any) => {
        console.error('Error adding new chapter:', err);
        this.isCreatingChapter = false; // Hide skeleton loader on error
        this.newChapterCreating.emit(false); // Emit event
      },
      complete: () => {
        this.isCreatingChapter = false; // Hide skeleton loader
        this.newChapterCreating.emit(false); // Emit event
      }
    });
  }
}
