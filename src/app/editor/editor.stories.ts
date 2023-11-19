import { moduleMetadata } from '@storybook/angular';
import { EditorComponent } from './editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export default {
  title: 'EditorComponent',
  component: EditorComponent,
};

export const Primary = () => ({
  props: {
    htmlContent: '',
  },
});
