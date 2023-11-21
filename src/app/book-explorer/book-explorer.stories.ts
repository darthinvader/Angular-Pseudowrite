import { BookExplorerComponent } from './book-explorer.component';

export default {
  title: 'Book Explorer Component',
  component: BookExplorerComponent,
};

export const Default = () => ({
  component: BookExplorerComponent,
});


export const ManyBooks = () => ({
  component: BookExplorerComponent,
  props: { books: [{ title: 'Hello' }, { title: 'Hello' }, { title: 'Hello' }, { title: 'Hello' }, { title: 'Hello' }, { title: 'Hello' }, { title: 'Hello' }, { title: 'Hello' }] }
});
