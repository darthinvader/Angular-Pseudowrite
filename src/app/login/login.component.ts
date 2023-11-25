import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
  constructor(public authService: AuthService, private firestore: AngularFirestore) { }
  faGoogle = faGoogle


  onGoogleLogin() {
    this.authService.signInWithGoogle()
  }

  onGoogleLogout() {
    this.authService.signOutGoogle()
  }
}
