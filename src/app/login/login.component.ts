import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { ButtonComponent } from '../button/button.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
