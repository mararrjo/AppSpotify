import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public isReady: boolean;
    public isAutenticated: boolean;

    constructor(private playerService: PlayerService, private clientService: ClientService) {
        this.isReady = false;
        this.isAutenticated = true;
    }

    public ngOnInit(): void {
        this.playerService.isConnect().subscribe(ready => {
            this.isReady = ready;
            console.log("Is ready", this.isReady);
        });
        this.playerService.isAutenticated().subscribe(autenticated => {
            this.isAutenticated = autenticated;
            console.log("Is Autenticated", this.isAutenticated);
        });
    }

    public login(): void {
        this.clientService.login();
    }


}
