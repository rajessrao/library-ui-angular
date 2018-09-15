import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    user: any = { email: '', password: '' };

    constructor(private authService: AuthService, private router: Router) { }

    signUpWithEmail() {
        this.authService.signUpWithEmail(this.user.email, this.user.password).then((res) => {
            this.router.navigate(['library']);
        }).catch((err) => console.log(err));
    }

    ngOnInit() {}
}
