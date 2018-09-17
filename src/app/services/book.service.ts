import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(200)]),
    availability: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    userid: new FormControl('')
  });
  bookList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getBooks() {
    this.bookList = this.fireBase.list('books');
    return this.bookList.snapshotChanges();
  }

  addBook(book) {
    this.bookList.push(book);
  }

  updateBook(book) {
    this.bookList.update(book.$key, {
      title: book.title,
      author: book.author,
      description: book.description,
      availability: book.availability,
      purpose: book.purpose,
      location: book.location
    });
  }

  populateBookForm(book) {
    this.bookForm.setValue(book);
  }

}
