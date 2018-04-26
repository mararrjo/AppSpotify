import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { ArtistsService } from "../../services/artists.service";
import { Tracks } from "../../models/tracks.model";
import { Artist } from "../../models/album.model";

import { TrackHandler, ArtistCollection } from "spotify-sdk";
// import { TrackHandler, ArtistHandler, ArtistCollection } from "spotify-sdk";
// import { ArtistHandler } from "../../models/handlers/ArtistHandler.js";
import ArtistHandler from "spotify-sdk/src/handlers/ArtistHandler.js";

@Component({
    selector: "app-artists",
    templateUrl: "./artists.component.html",
    providers: [ArtistsService]
})
export class ArtistsComponent implements OnInit {

    private artist: string;
    public listaArtistas: Array<Artist>;
    public listaCanciones: Array<Tracks>;

    constructor(
        private clientService: ClientService,
        private artistsService: ArtistsService
    ) {
        this.listaArtistas = [];
        this.listaCanciones = [];
        // if (sessionStorage.token) {
        //     this.clientService.setToken(sessionStorage.token);
        // }
    }

    public ngOnInit(): void {

    }

    public searchArtists(word: string): void {
        this.artist = word;

        this.listaArtistas = [];

        const artistHandler = new ArtistHandler();
        artistHandler.search(this.artist, {limit: 50}).then((artistCollection) => {
            artistCollection.forEach((artist) => {
                this.listaArtistas.push(new Artist(artist));
            });
        });

    }

    public clickArtista(event, index: number): void {
        event.preventDefault();
        this.listaCanciones = [];
        const idArtista = this.listaArtistas[index].id;
        const artistHandler = new ArtistHandler();
        artistHandler.topTracks(idArtista, {country: "ES"}).then((tracksCollection) => {
            tracksCollection.forEach(t => {
                this.listaCanciones.push(t);
            });
        });

    }

}
