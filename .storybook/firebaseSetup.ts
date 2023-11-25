import { initializeApp } from 'firebase/app';
import { environment } from '../src/environments/environment';

initializeApp(environment.firebaseConfig);
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Simulate retrieving the initial logged-in status
    const storedStatus = false; // Replace with logic to get from local storage if needed
    this.isLoggedInSubject.next(storedStatus);
  }

  // Mock method to simulate Google Sign-In
  async signInWithGoogle() {
    // Simulate successful sign in
    this.isLoggedInSubject.next(true);
    return of({ user: { displayName: 'Mock User', email: 'mock@example.com' } });
  }

  // Mock method to simulate Sign out
  async signOutGoogle() {
    this.isLoggedInSubject.next(false);
  }

  // Additional methods if needed
}

export class MockAngularFirestore {
  // Mock the methods and properties used by your components
  collection(path: string) {
    return {
      doc: (id: string) => ({
        set: (data: any) => Promise.resolve(data),
        // Add other methods as needed
      }),
      // Add other collection methods as needed
    };
  }
}

export class mockActivatedRoute {
}