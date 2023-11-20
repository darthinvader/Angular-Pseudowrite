import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileLines, faEllipsisVertical, faGripVertical, faFolderOpen, faTrash, faFileExport, faClone, faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ProjectTitleComponent } from './project-title/project-title.component';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, FormsModule, ProjectTitleComponent
  ],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  @Input() files: string[] = ['File 1', 'File 2', 'File 3'];
  faFileLines = faFileLines
  faEllipsisVertical = faEllipsisVertical
  faGripVertical = faGripVertical
  faFolderOpen = faFolderOpen
  faTrash = faTrash;
  faFileExport = faFileExport;
  faClone = faClone;
  faFileImport = faFileImport;
  faPlus = faPlus;

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    console.log(this.files, event)
  }
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


