import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(protected authService: AuthService, private firestore: AngularFirestore) { }
  faGoogle = faGoogle

  createUserProfile(user: firebase.User | null) {
    if (user === null) {
      console.error('User was noone :/');
      return
    }
    const userProfile = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      books: {} // Initialize empty books object
    };
    return this.firestore.collection('Users').doc(user.uid).set(userProfile);
  }

  onGoogleLogin() {
    this.authService.signInWithGoogle().then((result) => {
      if (result?.additionalUserInfo?.isNewUser) {
        this?.createUserProfile(result.user);
      }
    });
  }

  onGoogleLogout() {
    this.authService.signOutGoogle()
  }
}
