import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    sharedBookList = [];
    donatedBookList = [];

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.bookService.getBooks().subscribe(list => {
            this.sharedBookList = list.filter(item => item.payload.val().purpose.toLowerCase() === 'share')
            .map(item => {
                return {
                    $key: item.key,
                    ...item.payload.val()
                };
            });
            this.donatedBookList = list.filter(item => item.payload.val().purpose.toLowerCase() === 'donate')
            .map(item => {
                return {
                    $key: item.key,
                    ...item.payload.val()
                };
            });
        });
    }

}
