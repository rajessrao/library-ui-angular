import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    test: Date = new Date();
    error: any;

    constructor(private authService: AuthService, private router: Router) { }

    signInWithGoogle() {
        this.authService.signInWithGoogle().then((res) => {
            this.router.navigate(['library']);
        }).catch((err) => console.log(err));
    }

    ngOnInit() { }
}
