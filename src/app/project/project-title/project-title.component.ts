import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faBookOpen, faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-project-title',
  standalone: true,
  imports: [
    CommonModule, FormsModule, FontAwesomeModule
  ],
  templateUrl: './project-title.component.html',
})
export class ProjectTitleComponent {
  @Input() bookName: string = 'Book'
  editingTitle: boolean = false;
  originalBookName: string = ''
  faFileImport = faFileImport;
  faPlus = faPlus;
  faBookOpen = faBookOpen


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
    // Implement logic to add a new file
  }
}
