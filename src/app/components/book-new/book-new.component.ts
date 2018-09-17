import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {

  submitted: boolean;
  bookFormControls = this.bookService.bookForm.controls;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const currUserId = localStorage.getItem('currUser');
    if (this.bookService.bookForm.valid) {
      if (this.bookService.bookForm.get('$key').value === null) {
        this.bookService.bookForm.controls['userid'].setValue(currUserId);
        this.bookService.addBook(this.bookService.bookForm.value);
        alert('Success..');
      } else {
        this.bookService.updateBook(this.bookService.bookForm.value);
      }
      this.bookService.bookForm.reset();
      this.submitted = false;
    }

  }

}
