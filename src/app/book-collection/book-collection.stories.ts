import { BookCollectionComponent } from './book-collection.component';

export default {
  title: 'Components/Book Collection',
  component: BookCollectionComponent,
};

export const Default = () => ({
  component: BookCollectionComponent,
});


export const ManyBooks = () => ({
  component: BookCollectionComponent,
  props: { books: [{ title: 'Hello' }, { title: 'The beautiful Mermaid' }, { title: 'The Barbarian & The wild woman' }, { title: 'Batman & Not Robin' }, { title: '7 Heralds' }, { title: 'Samanthat & Melf' }, { title: 'Trouble In Hell' }, { title: 'Temporal Tempest' }] }
});
