import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Album } from "../../models/album.model";
import { ListTracks, Tracks } from "../../models/tracks.model";

// import { Client, TrackHandler, PlaylistHandler, AlbumHandler, AlbumCollection } from "spotify-sdk";
import { TrackHandler, PlaylistHandler, AlbumCollection } from "spotify-sdk";
import AlbumEntity from 'spotify-sdk/src/entities/AlbumEntity.js';
import AlbumHandler from 'spotify-sdk/src/handlers/AlbumHandler.js';
import { ClientService } from "../../services/client.service";
import { AlbumsService } from "../../services/albums.service";
import { PlayerService } from "../../services/player.service";

@Component({
    selector: "app-albums",
    templateUrl: "./albums.component.html",
    styleUrls: ["./albums.component.css"],
    providers: [AlbumsService]
})
export class AlbumsComponent implements OnInit {

    public title: string;
    public album: string;
    // public listaAlbumes: Array<Album>;
    public listaAlbumes: Array<any>;
    public listaCanciones: Array<Tracks>;
    public srcSpotify: any;
    public audioObject: any;
    public showCancion: Array<boolean>;
    // public client: any;

    public currentTrack: Tracks;

    constructor(
        private albumsService: AlbumsService,
        private sanitizer: DomSanitizer,
        private client: ClientService,
        private playerService: PlayerService
    ) {
        this.title = "Hola!";
        this.srcSpotify = "";
        this.audioObject = null;
        this.listaAlbumes = [];
        this.listaCanciones = [];
        this.showCancion = [];

    }

    ngOnInit() {

        // this.playerService.getCurrentTrack().subscribe((track: Tracks) => {
        //     this.currentTrack = track;
        //     console.log(this.currentTrack);
        // });

    }

    public searchAlbum(word: string): void {
        this.album = word;
        this.listaAlbumes = [];
        this.listaCanciones = [];
        const track = new TrackHandler();
        const albumHandler = new AlbumHandler();
        albumHandler.search(this.album, {limit: 50}).then((albumCollection: AlbumCollection) => {
            albumCollection.forEach((e: AlbumEntity) => {
                this.listaAlbumes.push(e);
            });
        });
    }

    public clickAlbum(event, index: number): void {
        event.preventDefault();
        this.listaCanciones = [];
        const idAlbum = this.listaAlbumes[index].id;
        const albumHandler = new AlbumHandler();
        albumHandler.get(idAlbum).then((albumEntity) => {
            this.listaCanciones = albumEntity.tracks.items;
            this.playerService.playList(this.listaCanciones.map(c => c.id)).subscribe(res => {
            });
        });


    }

}
