import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    test: Date = new Date();
    user: any = { email: '', password: '' };

    constructor(private authService: AuthService, private router: Router) { }

    signInWithEmail() {
        this.authService.signInWithEmail(this.user.email, this.user.password).then((res) => {
            this.router.navigate(['library']);
        }).catch((err) => console.log(err));
    }

    ngOnInit() { }
}
