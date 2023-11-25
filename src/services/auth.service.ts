import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(public afAuth: AngularFireAuth) { }
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
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }
}
