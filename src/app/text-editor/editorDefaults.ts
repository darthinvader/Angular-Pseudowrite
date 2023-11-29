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
  height: 'calc(70vh - 70px)',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Write Chapter Here...',
  fonts: [
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'merriweather', name: 'Merriweather' },
    { class: 'roboto', name: 'Roboto' },
    { class: 'arial', name: 'Arial' },
    { class: 'lora', name: 'Lora' },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: toolbarHiddenButtons,
};