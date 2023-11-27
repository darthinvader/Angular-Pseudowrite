import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseBook } from '../models/Book';
import { FirebaseChapter } from '../models/Chapter';
import { FirebaseUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  private getCurrentUserId(): Observable<string | null> {
    return this.authService.getCurrentUserId();
  }

  createBook(title: string, imageUrl?: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        const bookRef = this.firestore.collection<FirebaseBook>(`users/${userId}/books`).doc();
        return bookRef.set({ title, chaptersInfo: [] });
      }),
      catchError(error => throwError(() => error))
    );
  }

  createChapter(bookId: string, title: string, content: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        const chapterRef = this.firestore.collection<FirebaseChapter>(`users/${userId}/books/${bookId}/chapters`).doc();
        return chapterRef.set({ title, content });
      }),
      catchError(error => throwError(() => error))
    );
  }

  fetchBook(bookId: string): Observable<FirebaseBook | undefined> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc<FirebaseBook>(`users/${userId}/books/${bookId}`).valueChanges();
      }),
      catchError(error => throwError(() => error))
    );
  }

  fetchChapter(bookId: string, chapterId: string): Observable<FirebaseChapter | undefined> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc<FirebaseChapter>(`users/${userId}/books/${bookId}/chapters/${chapterId}`).valueChanges();
      }),
      catchError(error => throwError(() => error))
    );
  }

  fetchUserData(): Observable<FirebaseUser | undefined> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc<FirebaseUser>(`users/${userId}`).valueChanges();
      }),
      catchError(error => throwError(() => error))
    );
  }

  writeBook(bookId: string, title: string, imageUrl: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc(`users/${userId}/books/${bookId}`).set({ title, imageUrl }, { merge: true });
      }),
      catchError(error => throwError(() => error))
    );
  }

  writeChapter(bookId: string, chapterId: string, title: string, content: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc(`users/${userId}/books/${bookId}/chapters/${chapterId}`).set({ title, content }, { merge: true });
      }),
      catchError(error => throwError(() => error))
    );
  }

  deleteBook(bookId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc(`users/${userId}/books/${bookId}`).delete();
      }),
      catchError(error => throwError(() => error))
    );
  }

  deleteChapter(bookId: string, chapterId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) throw new Error("User not authenticated");
        return this.firestore.doc(`users/${userId}/books/${bookId}/chapters/${chapterId}`).delete();
      }),
      catchError(error => throwError(() => error))
    );
  }
}
