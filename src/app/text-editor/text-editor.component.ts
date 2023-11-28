import { Chapter } from './../../models/Chapter';
import { Component, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { editorConfig } from './editorDefaults';
import { ButtonComponent } from '../button/button.component';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AngularEditorModule, FormsModule, HttpClientModule, ButtonComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TextEditorComponent {
  @Input() htmlContent = ''
  @Input() bookId = ''
  @Input() chapterInfo: Chapter = { id: '', title: '' }
  @Input() editorConfig = editorConfig
  constructor(private firestoreService: FirestoreService,
    private cd: ChangeDetectorRef) { }

  saveContent() {
    const bookId = this.bookId; // You should get this from your application context
    const chapterId = this.chapterInfo.id; // As above
    this.firestoreService.writeChapter(bookId, chapterId, this.chapterInfo.title, this.htmlContent).subscribe({
      next: () => {
        console.log('Content saved successfully');
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error saving content:', err);
        this.cd.markForCheck();
      }
    });
  }
}