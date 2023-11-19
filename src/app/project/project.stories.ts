import { ProjectComponent } from './project.component';

export default {
  title: 'Project Component',
  component: ProjectComponent,
};

export const Default = () => ({
  component: ProjectComponent,
  props: {
    files: ['File 1', 'File 2', 'File 3'],

  },
});

export const Empty = () => ({
  component: ProjectComponent,
  props: {
    files: [],
  },
});
