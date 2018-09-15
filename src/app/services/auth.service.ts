import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          localStorage.setItem('userEmail', user.email);
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signUpWithEmail(email, password) {
    return this._firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(credential => {
        localStorage.setItem('userEmail', credential.user.email);
        this.userDetails = credential.user;
      });
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then(credential => {
        localStorage.setItem('userEmail', credential.user.email);
        this.userDetails = credential.user;
      });
  }

  signInWithEmail(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        localStorage.setItem('userEmail', credential.user.email);
        this.userDetails = credential.user;
      });
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => {
        localStorage.clear();
        // localStorage.setItem('userEmail', null);
        this.router.navigate(['/'])
      });
  }
}