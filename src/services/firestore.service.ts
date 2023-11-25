import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Function to get all books of a specific user
  getBooks(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).collection('books').valueChanges({ idField: 'id' });
  }

  // Function to get all chapters of a specific book
  getChapters(userId: string, bookId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).collection('books').doc(bookId).collection('chapters').valueChanges({ idField: 'id' });
  }

  // Add more functions as needed for CRUD operations
}
