import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {

  submitted: boolean;
  loggedInUserId: string;
  bookFormControls = this.bookService.bookForm.controls;

  constructor(private authService: AuthService, private bookService: BookService) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.loggedInUserId = user.uid;
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookService.bookForm.valid) {
      if (this.bookService.bookForm.get('$key').value === null) {
        this.bookService.bookForm.controls['userid'].setValue(this.loggedInUserId);
        this.bookService.addBook(this.bookService.bookForm.value);
        alert('Book added successfully.');
      } else {
        this.bookService.updateBook(this.bookService.bookForm.value);
        alert('Book updated successfully.');
      }
      this.bookService.bookForm.reset();
      this.submitted = false;
    }

  }

}
