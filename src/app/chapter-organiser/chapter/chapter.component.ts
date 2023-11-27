import { Component, Input } from '@angular/core';
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

  constructor(private firestoreService: FirestoreService) { }

  startEditing(): void {
    this.editingTitle = true;
    this.editableTitle = this.chapter?.title ?? '';
  }

  finishEditing(): void {
    console.log(this.editableTitle, this.chapter)
    if (this.editableTitle.trim() && this.editableTitle !== this.chapter?.title) {
      this.renameChapter(this.chapter?.id ?? '', this.editableTitle);
    }
    this.editingTitle = false;
  }

  renameChapter(chapterId: string, newTitle: string): void {
    console.log(this.chapter, this.bookId, newTitle)
    if (this.bookId && chapterId) {
      this.firestoreService.updateChapterTitle(this.bookId, chapterId, newTitle).subscribe({
        next: () => console.log('Chapter title updated successfully'),
        error: (err) => console.error('Error updating chapter title:', err)
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
