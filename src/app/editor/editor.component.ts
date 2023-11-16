import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AngularEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.sass'
})
export class EditorComponent {
  htmlContent = ''
}
