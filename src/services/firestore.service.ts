import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError, switchMap, map, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseUser } from '../models/User';
import { FirebaseBook } from '../models/Book';
import { Book } from '../models/Book';
import { Chapter } from '../models/Chapter';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  private getCurrentUserId(): Observable<string> {
    return this.authService.getCurrentUserId().pipe(
      switchMap(userId => {
        console.log('Current user ID:', userId);
        return userId ? userId : throwError(() => new Error("User not authenticated"));
      }),
      catchError(error => {
        console.error('Error in getCurrentUserId:', error);
        return throwError(() => error);
      })
    );
  }

  private fetchFromFirestore<T>(pathWithUserId: (userId: string) => string): Observable<T | undefined> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        console.log(`Fetching from Firestore path: ${pathWithUserId(userId)}`);
        return this.firestore.doc<T>(pathWithUserId(userId)).valueChanges();
      }),
      catchError(error => {
        console.error('Error in fetchFromFirestore:', error);
        return throwError(() => error);
      })
    );
  }

  // Fetches a specific book's details
  fetchBook(bookId: string): Observable<FirebaseBook | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`);
  }

  // Fetches the IDs of all books for the current user
  fetchBookIds(): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseUser>(userId => `users/${userId}`).pipe(
      map(user => user?.bookIds)
    );
  }

  // Fetches the titles of all books for the current user
  fetchBookTitles(): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseUser>(userId => `users/${userId}`).pipe(
      map(user => user?.bookTitles)
    );
  }

  // Fetches the IDs of all chapters for a specific book
  fetchChapterIds(bookId: string): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`).pipe(
      map(book => book?.chapterIds)
    );
  }

  // Fetches the titles of all chapters for a specific book
  fetchChapterTitles(bookId: string): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`).pipe(
      map(book => book?.chapterTitles)
    );
  }

  // Fetches details of a specific chapter in a book
  fetchChapterDetails(bookId: string, chapterId: string): Observable<any | undefined> {
    return this.fetchFromFirestore<any>(userId => `users/${userId}/books/${bookId}/chapters/${chapterId}`);
  }

  // Creates a new book or updates an existing one
  saveBook(bookId: string | null, bookData: FirebaseBook): Observable<void> {
    return this.authService.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          throw new Error("User not authenticated");
        }
        const bookRef = bookId
          ? this.firestore.doc(`users/${userId}/books/${bookId}`)
          : this.firestore.collection(`users/${userId}/books`).doc();

        return bookRef.set(bookData, { merge: true });
      }),
      catchError(error => throwError(() => error))
    );
  }

  // Creates a new chapter or updates an existing one
  saveChapter(bookId: string, chapterId: string | null, chapterData: Chapter): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        // If no chapterId is provided, create a new document with a generated ID
        const chapterRef = chapterId ? this.firestore.doc(`users/${userId}/books/${bookId}/chapters/${chapterId}`)
          : this.firestore.collection(`users/${userId}/books/${bookId}/chapters`).doc();
        return chapterRef.set(chapterData, { merge: true });
      }),
      catchError(error => throwError(() => error))
    );
  }


  // Deletes a specific book
  deleteBook(bookId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc(`users/${userId}/books/${bookId}`).delete()),
      catchError(error => throwError(() => error))
    );
  }

  // Deletes a specific chapter from a book
  deleteChapter(bookId: string, chapterId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc(`users/${userId}/books/${bookId}/chapters/${chapterId}`).delete()),
      catchError(error => throwError(() => error))
    );
  }
}
