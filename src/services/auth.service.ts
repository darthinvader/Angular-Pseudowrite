  import { BehaviorSubject, Observable, map } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { AngularFireAuth } from '@angular/fire/compat/auth';
  import firebase from 'firebase/compat/app';
  @Injectable({ providedIn: 'root' })
  export class AuthService {
    private userIdSubject = new BehaviorSubject<string | null>(null);

    constructor(public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => {
        this.userIdSubject.next(user ? user.uid : null);
      });
    }
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        this.afAuth.signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
    }
    async signOutGoogle() {
      await this.afAuth.signOut()
    }

    isSignedIn() {
      return this.afAuth.authState;
    }

    getCurrentUserId(): Observable<string | null> {
      return this.userIdSubject.asObservable();
    }
  }
