import { ChapterOrganizerComponent } from './../chapter-organiser/chapter-organiser.component';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { FirebaseBook } from '../../models/Book';
import { FirebaseChapter } from '../../models/Chapter';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-writing-workspace',
  standalone: true,
  imports: [
    CommonModule, ChapterOrganizerComponent, TextEditorComponent, ButtonComponent
  ],
  templateUrl: './writing-workspace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingWorkspaceComponent implements OnInit {
  bookId?: string | null;
  chapterId?: string | null;
  book?: FirebaseBook;
  chapter?: FirebaseChapter;
  private routeSubscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.authService.isSignedIn().subscribe(authenticated => {
      if (authenticated) {
        this.retrieveData()
        this.routeSubscription = this.route.paramMap.subscribe(params => {
          this.bookId = params.get('bookId');
          this.chapterId = params.get('chapterId');
          if (this.chapterId) {
            this.retrieveChapter();
          }
        });
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
      this.firestoreService.fetchChapter(this.bookId, this.chapterId)
        .subscribe(chapter => {
          this.chapter = chapter;
          this.changeDetector.markForCheck(); // Trigger change detection
        }, error => {
          console.error('Error fetching chapter:', error);
          // Handle error scenario
        });
    }
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
