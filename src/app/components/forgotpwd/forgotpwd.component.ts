import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-forgotpwd',
    templateUrl: './forgotpwd.component.html',
    styleUrls: ['./forgotpwd.component.scss']
})
export class ForgotpwdComponent implements OnInit {
    test : Date = new Date();

    constructor() { }

    ngOnInit() {}
}
