import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Client } from "spotify-sdk";
import { ClientService } from "../../../services/client.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {

    // public client: any;
    public user: any;

    constructor(private clientService: ClientService) {}

    public ngOnInit(): void {
        this.clientService.getUserData().subscribe(user => {
            this.user = user;
        });
    }

    public login(): void {
        this.clientService.client.login().then((url) => {
            window.location.href = url;
        });
    }

}
