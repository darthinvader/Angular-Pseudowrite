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
        if (!userId) return throwError(() => new Error("User not authenticated"));
        return userId;
      }),
      catchError(error => throwError(() => error))
    );
  }

  private fetchFromFirestore<T>(pathWithUserId: (userId: string) => string): Observable<T | undefined> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc<T>(pathWithUserId(userId)).valueChanges()),
      catchError(error => throwError(() => error))
    );
  }

  fetchBook(bookId: string): Observable<FirebaseBook | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`);
  }

  fetchBookIds(): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseUser>(userId => `users/${userId}`).pipe(
      map(user => user?.bookIds)
    );
  }

  fetchBookTitles(): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseUser>(userId => `users/${userId}`).pipe(
      map(user => user?.bookTitles)
    );
  }

  fetchChapterIds(bookId: string): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`).pipe(
      map(book => book?.chapterIds)
    );
  }

  fetchChapterTitles(bookId: string): Observable<string[] | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`).pipe(
      map(book => book?.chapterTitles)
    );
  }

  fetchBookDetails(bookId: string): Observable<FirebaseBook | undefined> {
    return this.fetchFromFirestore<FirebaseBook>(userId => `users/${userId}/books/${bookId}`);
  }

  fetchChapterDetails(bookId: string, chapterId: string): Observable<any | undefined> {
    return this.fetchFromFirestore<any>(userId => `users/${userId}/books/${bookId}/chapters/${chapterId}`);
  }

  saveBook(bookId: string, bookData: Book): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc(`users/${userId}/books/${bookId}`).set(bookData, { merge: true })),
      catchError(error => throwError(() => error))
    );
  }

  saveChapter(bookId: string, chapterId: string, chapterData: Chapter): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc(`users/${userId}/books/${bookId}/chapters/${chapterId}`).set(chapterData, { merge: true })),
      catchError(error => throwError(() => error))
    );
  }

  deleteBook(bookId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc(`users/${userId}/books/${bookId}`).delete()),
      catchError(error => throwError(() => error))
    );
  }

  deleteChapter(bookId: string, chapterId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.firestore.doc(`users/${userId}/books/${bookId}/chapters/${chapterId}`).delete()),
      catchError(error => throwError(() => error))
    );
  }
}
