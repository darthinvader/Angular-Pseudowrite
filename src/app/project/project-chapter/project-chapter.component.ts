import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileLines, faGripVertical, faTrash, faFileExport, faClone, } from '@fortawesome/free-solid-svg-icons';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-chapter',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule
  ],
  templateUrl: './project-chapter.component.html',
})
export class ProjectChapterComponent {
  @Input() file: string = '';
  @Input() index: number = 0
  faFileLines = faFileLines
  faGripVertical = faGripVertical
  faTrash = faTrash;
  faFileExport = faFileExport;
  faClone = faClone;

  deleteFile(index: number): void {
    // Implement file deletion logic
  }

  exportFile(file: string): void {
    // Implement file export logic
  }

  duplicateFile(file: string): void {
    // Implement file duplication logic
  }
}
