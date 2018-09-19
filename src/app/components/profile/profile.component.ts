import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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

    constructor(private authService: AuthService, private bookService: BookService, private userService: UserService) {
        this.authService.user.subscribe(user => {
            if (user) {
                this.userId = user.uid;
                console.log(this.userId);
            }
        });
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(list => {
            const currUser = list.filter(item => item.payload.val().uid === this.userId)
                .map(item => {
                    return {
                        $key: item.key, ...item.payload.val()
                    };
                });
            this.user = currUser[0];
        })
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
