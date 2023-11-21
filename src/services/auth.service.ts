import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { LocalStorageService } from './storage-service.service';
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn: boolean = false;
  // Using localstorage aas a backup for when app initializes
  constructor(public afAuth: AngularFireAuth, private localStorage: LocalStorageService) {
    this.isLoggedIn = this.localStorage.getItem('user')
    this.afAuth.authState.subscribe(
      (user) => {
        if (user) {
          this.localStorage.setItem('user', true);
          this.isLoggedIn = true;
        } else {
          this.localStorage.setItem('user', false);
          this.isLoggedIn = false;
        }
      }
    );

  }
  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async signOutGoogle() {
    await this.afAuth.signOut()
  }
}
