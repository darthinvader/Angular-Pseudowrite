import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { Chapter } from '../../../models/Chapter';
import { faFileLines, faGripVertical, faTrash, faFileExport, faClone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, FormsModule
  ],
  templateUrl: './chapter.component.html',
})
export class ChapterComponent {
  @Input() chapter?: Chapter;
  @Input() bookId?: string;

  editingTitle: boolean = false;
  editableTitle: string = '';

  faFileLines = faFileLines;
  faGripVertical = faGripVertical;
  faTrash = faTrash;
  faFileExport = faFileExport;
  faClone = faClone;
  faPencilAlt = faPencilAlt;

  constructor(
    private firestoreService: FirestoreService,
    private cd: ChangeDetectorRef // Add ChangeDetectorRef
  ) { }

  startEditing(): void {
    this.editingTitle = true;
    this.editableTitle = this.chapter?.title ?? '';
  }

  finishEditing(): void {
    if (this.editableTitle.trim() && this.chapter && this.editableTitle !== this.chapter.title) {
      const originalTitle = this.chapter.title;
      this.chapter.title = this.editableTitle; // Optimistic update

      this.renameChapter(this.chapter.id, this.editableTitle, originalTitle);
    }
    this.editingTitle = false;
  }

  renameChapter(chapterId: string, newTitle: string, originalTitle: string): void {
    if (this.bookId) {
      this.firestoreService.updateChapterTitle(this.bookId, chapterId, newTitle).subscribe({
        next: () => {
          console.log('Chapter title updated successfully');
          this.cd.markForCheck();
        },
        error: (err) => {
          console.error('Error updating chapter title:', err);
          if (this.chapter) {
            this.chapter.title = originalTitle; // Revert title on error
            this.cd.markForCheck();
          }
        }
      });
    }
  }


  deleteFile(chapterId?: string): void {
    if (this.bookId && chapterId) {
      this.firestoreService.deleteChapter(this.bookId, chapterId).subscribe({
        next: () => console.log('Chapter deleted successfully'),
        error: (err) => console.error('Error deleting chapter:', err)
      });
    }
  }

  exportFile(chapterId?: string): void {
    // Implement file export logic
  }

  duplicateFile(chapterId?: string): void {
    if (this.bookId && chapterId) {
      this.firestoreService.fetchChapter(this.bookId, chapterId).subscribe(chapter => {
        if (chapter && this.bookId) {
          this.firestoreService.createChapter(this.bookId, `Copy of ${chapter.title}`, chapter.content).subscribe({
            next: () => console.log('Chapter duplicated successfully'),
            error: (err) => console.error('Error duplicating chapter:', err)
          });
        }
      });
    }
  }
}
