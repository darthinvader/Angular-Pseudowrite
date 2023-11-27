import { BookCardComponent } from './book-card.component';

export default {
  title: 'Book Card Component',
  component: BookCardComponent,
};

export const Default = () => ({
  component: BookCardComponent,
  props: { book: { title: 'Hello' } }

});

export const WithoutBook = () => ({
  component: BookCardComponent,
});
