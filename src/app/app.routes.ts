import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EditorComponent } from './editor/editor.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book/:bookId/chapter/:chapterId', component: EditorComponent },
  // { path: 'user-profile', component: UserProfileComponent }
  { path: 'about', component: AboutComponent }
];
