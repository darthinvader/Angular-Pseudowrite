  import { Routes } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { AboutComponent } from './about/about.component';
  import { WritingWorkspaceComponent } from './writing-workspace/writing-workspace.component';
  export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'book/:bookId/chapter/:chapterId', component: WritingWorkspaceComponent },
    { path: 'book/:bookId/chapter', component: WritingWorkspaceComponent },
    // { path: 'user-profile', component: UserProfileComponent }
    { path: 'about', component: AboutComponent }
  ];
