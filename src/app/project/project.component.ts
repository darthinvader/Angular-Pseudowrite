import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faFileLines, faEllipsisVertical, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule
  ],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  files: string[] = ['File 1', 'File 2', 'File 3'];
  faBookOpen = faBookOpen
  faFileLines = faFileLines
  faEllipsisVertical = faEllipsisVertical
  faGripVertical = faGripVertical

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    console.log(this.files, event)
  }
}


