import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileLines, faGripVertical, faTrash, faFileExport, faClone, } from '@fortawesome/free-solid-svg-icons';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule
  ],
  templateUrl: './chapter.component.html',
})
export class ChapterComponent {
  @Input() title = '';
  @Input() chapterId: string = '-1';

  faFileLines = faFileLines
  faGripVertical = faGripVertical
  faTrash = faTrash;
  faFileExport = faFileExport;
  faClone = faClone;

  deleteFile(chapterid: string): void {
    // Implement file deletion logic
  }

  exportFile(file: string): void {
    // Implement file export logic
  }

  duplicateFile(file: string): void {
    // Implement file duplication logic
  }
}
