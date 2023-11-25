import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { EditorComponent } from '../editor/editor.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-editor',
  standalone: true,
  imports: [
    CommonModule, ProjectComponent, EditorComponent
  ],
  templateUrl: './book-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEditorComponent {
  bookId: string | null = null;
  chapterId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.chapterId = this.route.snapshot.paramMap.get('chapterId');
  }
}