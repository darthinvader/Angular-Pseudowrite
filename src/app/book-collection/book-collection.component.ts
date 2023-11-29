import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { FirestoreService } from '../../services/firestore.service';
import { Book } from '../../models/Book';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../button/button.component';
@Component({
  selector: 'app-book-collection',
  standalone: true,
  imports: [CommonModule, BookCardComponent, ButtonComponent],
  templateUrl: './book-collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCollectionComponent {
  @Input() books: Book[] = [];
  faPlus = faPlus;
  private authSubscription: Subscription | undefined;

  constructor(
    private firestore: FirestoreService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.isSignedIn().subscribe(authenticated => {
      if (authenticated) {
        this.firestore.fetchUserData().subscribe(userData => {
          this.books = userData?.booksInfo || [];
          this.cd.markForCheck();
        });
      } else {
        this.books = [];
      }
    });
  }

  addNewBook() {
    console.log('Adding new book:');
    this.firestore.createBook('New Book').subscribe({
      next: () => {
        console.log('New book added successfully');
        this.cd.markForCheck();
      },
      error: (err) => console.error('Error adding new book:', err),
      complete: () => console.log('Completed adding new book'),
    });
  }

}
