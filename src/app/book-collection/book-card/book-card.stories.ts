import { BookCardComponent } from './book-card.component';

export default {
  title: 'Components/Book Card',
  component: BookCardComponent,
};

export const Default = () => ({
  component: BookCardComponent,
  props: { book: { title: 'Hello' } }

});

export const WithoutBook = () => ({
  component: BookCardComponent,
});
