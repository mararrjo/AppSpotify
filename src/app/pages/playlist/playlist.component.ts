import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "../../services/playlist.service";
import UserHandler from "spotify-sdk/src/handlers/UserHandler.js";
import { ClientService } from "../../services/client.service";
import { Tracks } from "../../models/tracks.model";
import { PlayerService } from "../../services/player.service";

@Component({
    selector: "app-playlist",
    templateUrl: "./playlist.component.html",
    providers: [ PlaylistService ]
})
export class PlaylistComponent implements OnInit {

    private user: any;
    public playlists: Array<any>;
    public listaCanciones: Array<Tracks>;

    constructor(
        private client: ClientService,
        private playerService: PlayerService
    ) {
        this.playlists = [];
        this.listaCanciones = [];
    }

    public ngOnInit() {
        this.client.getUserData().subscribe(user => {
            const userHandler = new UserHandler();
            userHandler.playlists(user.id).then(playlistCollection => {
                this.playlists = [];
                playlistCollection.forEach(p => {
                    this.playlists.push(p);
                });
                console.log(this.playlists);

            });
        });
    }

    public playlistSelect(event, index: number): void {
        event.preventDefault();
        if (this.playlists.length > 0) {
            this.listaCanciones = [];
            this.playlists[index].tracks.then(tracks => {
                tracks.forEach(track => {
                    this.listaCanciones.push(track);
                });
                this.playerService.playList(this.listaCanciones.map(c => c.id)).subscribe(res => {});
            });
        }
    }

}
