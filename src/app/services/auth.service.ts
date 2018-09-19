import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()

export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signUpWithEmail(user) {
    return this._firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        this.userDetails = credential.user;
        if (credential.additionalUserInfo && credential.additionalUserInfo.isNewUser) {
          this.addUserIfNewUser(this.userDetails.uid, user.fullName, this.userDetails.email, user.mobile);
        }
      });
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then(credential => {
        this.userDetails = credential.user;
        if (credential.additionalUserInfo && credential.additionalUserInfo.isNewUser) {
          this.addUserIfNewUser(this.userDetails.uid, this.userDetails.displayName, this.userDetails.email, this.userDetails.phoneNumber);
        }
      });
  }

  signInWithEmail(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.userDetails = credential.user;
        if (credential.additionalUserInfo && credential.additionalUserInfo.isNewUser) {
          this.addUserIfNewUser(this.userDetails.uid, this.userDetails.displayName, this.userDetails.email, this.userDetails.phoneNumber);
        }
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
        this.router.navigate(['/'])
      });
  }

  addUserIfNewUser(uid, fullName, email, mobile) {
    this.userService.addUser({
      uid: uid,
      fullName: fullName,
      email: email,
      mobile: mobile
    });
  }
}
