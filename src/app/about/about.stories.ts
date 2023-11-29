import { Meta, moduleMetadata } from '@storybook/angular';
import { AboutComponent } from './about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export default {
  title: 'Pages/About',
  component: AboutComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [FontAwesomeModule],
    }),
  ],
} as Meta;

export const Default = () => ({
  component: AboutComponent,
});
