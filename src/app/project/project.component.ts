import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faFileLines, faEllipsisVertical, faGripVertical, faFolderOpen, faTrash, faFileExport, faClone } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, FormsModule
  ],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  @Input() files: string[] = ['File 1', 'File 2', 'File 3'];
  @Input() bookName: string = 'Book'
  editingTitle: boolean = false;
  originalBookName: string = ''


  faBookOpen = faBookOpen
  faFileLines = faFileLines
  faEllipsisVertical = faEllipsisVertical
  faGripVertical = faGripVertical
  faFolderOpen = faFolderOpen
  faTrash = faTrash;
  faFileExport = faFileExport;
  faClone = faClone;

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    console.log(this.files, event)
  }

  onTitleClick(): void {
    this.editingTitle = true;
    this.originalBookName = this.bookName; // Store the original book name
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
    // Implement logic to add a new file
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


