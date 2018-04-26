import { Component } from "@angular/core";

@Component({
    selector: "app-login",
    template: `login`
})
export class LoginComponent {

    constructor() {
        if (window.location.hash.split('&')[0].split('=')[1]) {
            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
            location.href = "http://localhost:4200/";
        }
    }

}
