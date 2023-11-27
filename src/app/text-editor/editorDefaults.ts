import { AngularEditorConfig } from '@kolkov/angular-editor';

export const toolbarHiddenButtons = [
  [
    'subscript',
    'superscript',
  ],
  [
    'fontSize',
    'textColor',
    'backgroundColor',
    'customClasses',
    'link',
    'unlink',
    'insertImage',
    'insertVideo',
    'insertHorizontalRule',
    'toggleEditorMode'
  ]
]

export const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'calc(100vh - 100px)',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Write Chapter Here...',
  defaultFontName: 'roboto',
  fonts: [
    { class: 'roboto', name: 'Roboto' },
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: toolbarHiddenButtons,
};