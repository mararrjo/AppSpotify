import { Injectable } from "@angular/core";
// import { Client } from "spotify-sdk";
import Client from "spotify-sdk/src/Client.js";
import UserHandler from "spotify-sdk/src/handlers/UserHandler.js";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import { Subject } from "rxjs";

@Injectable()
export class ClientService {

    public client: any;
    public user: any;

    constructor() {

        this.user = null;

        this.client = Client.instance;
        this.client.setting = {
            clientId: "a044104fdccc42ddb6174655670a2cdb",
            secretId: "656ecacd4abf4905a02f5403d8f9d1fd",
            scopes: ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"],
            redirect_uri: "http://localhost:4200/login"
        };
        this.client._clientId = this.client.setting.clientId;
        this.client._secretId = this.client.setting.secretId;
        this.client._scopes = this.client.setting.scopes;
        this.client._redirect_uri = this.client.setting.redirect_uri;

        if (sessionStorage.token) {
            this.setToken(sessionStorage.token);
            this.getUserData().subscribe(user => {
                console.log("Datos del usuario: ", user);
                this.user = user;
            });
        }

    }

    public setToken(token: string): void {
        this.client.token = sessionStorage.token;
        this.client._token = sessionStorage.token;
    }

    public getUserData(force: boolean = false) {
        if (force) {
            const userHandler = new UserHandler();
            return Observable.fromPromise(userHandler.me());
        } else {
            if (this.user) {
                const $user = new Subject<any>();
                setTimeout(() => $user.next(this.user));
                return $user.asObservable();
            } else {
                const userHandler = new UserHandler();
                return Observable.fromPromise(userHandler.me());
            }
        }
    }

}
