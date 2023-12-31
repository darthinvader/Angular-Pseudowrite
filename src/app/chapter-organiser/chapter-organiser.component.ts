import { SkeletonComponent } from './skeleton-chapter/skeleton-chapter.component';
import { ChapterComponent } from './chapter/chapter.component';
import { BookTitleComponent } from './book-title/book-title.component';
import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FirebaseBook } from '../../models/Book';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from '../../models/Chapter';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chapter-organiser',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, DragDropModule, BookTitleComponent, ChapterComponent, SkeletonComponent
  ],
  templateUrl: './chapter-organiser.component.html',
})
export class ChapterOrganizerComponent implements OnDestroy {
  @Input() chapters?: Chapter[] = [];
  @Input() book?: FirebaseBook;
  @Input() bookId?: string;
  faFolderOpen = faFolderOpen;
  private routeSubscription: Subscription = new Subscription();
  showSkeletonChapter: boolean = false;
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.isSignedIn().subscribe(user => {
      if (user) {
        this.fetchBookData();
      } else {
        // Handle not authenticated scenario
      }
    });
  }

  private fetchBookData() {
    this.routeSubscription = this.route.params.subscribe(params => {
      const bookId = params['bookId'];
      if (bookId) {
        this.firestoreService.fetchBook(bookId).subscribe(book => {
          this.book = book;
          this.bookId = bookId;
          this.chapters = book?.chaptersInfo;
          this.cd.markForCheck();
        });
      }
    });
  }

  handleNewChapterCreating(isCreating: boolean): void {
    this.showSkeletonChapter = isCreating;
    if (isCreating) {
      // Add a temporary chapter to the chapters array
      const skeletonChapter: Chapter = { id: 'skeleton', title: 'Loading...' };
      this.chapters = [...(this.chapters || []), skeletonChapter];
    } else {
      // Remove the skeleton chapter from the chapters array
      this.chapters = this.chapters?.filter(chapter => chapter.id !== 'skeleton');
    }
    this.cd.markForCheck();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (this.chapters && this.bookId) {
      moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
      this.firestoreService.updateChapterOrder(this.bookId, this.chapters).subscribe(() => {
        // Handle successful update
        this.cd.markForCheck();
      });
    }
  }

  handleChapterDeletion(chapterId: string): void {
    this.chapters = this.chapters?.filter(chapter => chapter.id !== chapterId);
    this.cd.markForCheck();
  }

  handleChapterDuplication(newChapter: Chapter): void {
    this.chapters = [...(this.chapters || []), newChapter];
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
