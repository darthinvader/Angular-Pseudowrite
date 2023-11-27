import { ChapterComponent } from './chapter/chapter.component';
import { BookTitleComponent } from './book-title/book-title.component';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Book } from '../../models/Book';
import { Chapter } from '../../models/Chapter';
@Component({
  selector: 'app-chapter-organiser',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, BookTitleComponent, ChapterComponent
  ],
  templateUrl: './chapter-organiser.component.html',
})
export class ChapterOrganizingComponent {
  @Input() chapters: Chapter[] = [];
  @Input() book?: Book;
  faFolderOpen = faFolderOpen

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
    console.log(this.chapters, event)
  }
}


