import { ChapterOrganizerComponent } from './chapter-organiser.component';

export default {
  title: 'Components/Chapter Organizing',
  component: ChapterOrganizerComponent,
};

export const Default = () => ({
  component: ChapterOrganizerComponent,
  props: {
    chapters: ['File 1', 'File 2', 'File 3'],
  },
});

export const Empty = () => ({
  component: ChapterOrganizerComponent,
  props: {
    chapters: [],
  },
});
