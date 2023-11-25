import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProjectChapterComponent } from './project-chapter/project-chapter.component';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, ProjectTitleComponent, ProjectChapterComponent
  ],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  @Input() chapters: string[] = [];
  faFolderOpen = faFolderOpen

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
    console.log(this.chapters, event)
  }
}


