import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getUsers() {
    this.userList = this.fireBase.list('users');
    return this.userList.snapshotChanges();
  }

  addUser(user) {
    this.userList.push(user);
  }

  updateUser(user) {
    this.userList.update(user.$key, {
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile
    });
  }
}
