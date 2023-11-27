import { ChapterOrganizerComponent } from './../chapter-organiser/chapter-organiser.component';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { FirebaseBook } from '../../models/Book';
import { Chapter } from '../../models/Chapter';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from '../text-editor/text-editor.component';

@Component({
  selector: 'app-writing-workspace',
  standalone: true,
  imports: [
    CommonModule, ChapterOrganizerComponent, TextEditorComponent
  ],
  templateUrl: './writing-workspace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingWorkspaceComponent implements OnInit {
  bookId?: string | null;
  chapterId?: string | null;
  book?: FirebaseBook;
  chapter?: Chapter;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.isSignedIn().subscribe(authenticated => {
      if (authenticated) {
        this.retrieveData();
      } else {
        console.error('User not authenticated');
        // Handle unauthenticated user scenario
      }
    });
  }

  private retrieveData(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.chapterId = this.route.snapshot.paramMap.get('chapterId');
    if (this.bookId) {

    }
  }

  private retrieveChapter(): void {
    if (this.bookId && this.chapterId) {

    }
  }
}
