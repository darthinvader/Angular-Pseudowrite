import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

const toolbarHiddenButtons = [
  [
    'subscript',
    'superscript',
  ],
  [
    'textColor',
    'backgroundColor',
    'customClasses',
    'link',
    'unlink',
    'insertImage',
    'insertVideo',
    'insertHorizontalRule',
    'removeFormat',
    'toggleEditorMode'
  ]
]

const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultFontName: 'roboto',
  defaultFontSize: '',
  fonts: [
    { class: 'roboto', name: 'Roboto' },
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
  ],

  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: toolbarHiddenButtons
};
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AngularEditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
  htmlContent = ''
  editorConfig = editorConfig

  getSelectedText() {
    console.log(window)
    if (window.getSelection) {
      let selection = window.getSelection();
      console.log(selection?.toString())
    }
    return '';
  }
}
