import { ChapterOrganizingComponent } from './chapter-organiser.component';

export default {
  title: 'Project Component',
  component: ChapterOrganizingComponent,
};

export const Default = () => ({
  component: ChapterOrganizingComponent,
  props: {
    chapters: ['File 1', 'File 2', 'File 3'],
  },
});

export const Empty = () => ({
  component: ChapterOrganizingComponent,
  props: {
    chapters: [],
  },
});
