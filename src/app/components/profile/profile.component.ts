import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    sharedBookList = [];
    donatedBookList = [];
    user: any;
    userId: any;

    constructor(private router: Router,
        private authService: AuthService,
        private bookService: BookService,
        private userService: UserService) {
        this.authService.user.subscribe(user => {
            if (user) {
                this.userId = user.uid;
                this.getUser();
                this.getBooks();
            }
        });
    }

    ngOnInit() { }

    getUser() {
        this.userService.getUsers().subscribe(list => {
            const currUser = list.filter(item => item.payload.val().uid === this.userId)
                .map(item => {
                    return {
                        $key: item.key, ...item.payload.val()
                    };
                });
            this.user = currUser[0];
        });
    }

    getBooks() {
        this.bookService.getBooks().subscribe(list => {
            this.sharedBookList = list
                .filter(item => {
                    return item.payload.val().purpose.toLowerCase() === 'share' && item.payload.val().userid === this.userId
                })
                .map(item => {
                    return {
                        $key: item.key,
                        ...item.payload.val()
                    };
                });
            this.donatedBookList = list
                .filter(item => {
                    return item.payload.val().purpose.toLowerCase() === 'donate' && item.payload.val().userid === this.userId
                })
                .map(item => {
                    return {
                        $key: item.key,
                        ...item.payload.val()
                    };
                });
        });
    }

    editBook(book) {
        this.bookService.populateBookForm(book)
        this.router.navigate(['new-book']);
    }
}
