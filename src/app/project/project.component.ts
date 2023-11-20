import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProjectChapterComponent } from './project-chapter/project-chapter.component';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, FormsModule, ProjectTitleComponent, ProjectChapterComponent
  ],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  @Input() files: string[] = ['File 1', 'File 2', 'File 3'];
  faFolderOpen = faFolderOpen

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    console.log(this.files, event)
  }
}


