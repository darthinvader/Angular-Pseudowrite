import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { EditorComponent } from '../editor/editor.component';
@Component({
  selector: 'app-book-editor',
  standalone: true,
  imports: [
    CommonModule, ProjectComponent, EditorComponent
  ],
  styleUrl: './book-editor.component.scss',
  templateUrl: './book-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEditorComponent { }
