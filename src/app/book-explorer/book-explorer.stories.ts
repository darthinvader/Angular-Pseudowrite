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
  props: { books: [{ title: 'Hello' }, { title: 'The beautiful Mermaid' }, { title: 'The Barbarian & The wild woman' }, { title: 'Batman & Not Robin' }, { title: '7 Heralds' }, { title: 'Samanthat & Melf' }, { title: 'Trouble In Hell' }, { title: 'Temporal Tempest' }] }
});
