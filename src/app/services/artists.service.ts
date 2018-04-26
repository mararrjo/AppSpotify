import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Album, Artist } from "../models/album.model";
import { Tracks } from "../models/tracks.model";

import { Client, TrackHandler, PlaylistHandler } from "spotify-sdk";

export const ENDPOINT = "https://api.spotify.com/v1/";

@Injectable()
export class ArtistsService {

    private token: string;

    constructor (private http: HttpClient) {
        this.token = "BQD5Bq8SvdmnNucs-yRvdXSVbFS5KNdznRhGwzRPCpR6IIF4Ag6QI1wLsdEzJJR_oxY8ptf2AhTHxb07yDh0pi-AgiU-DCL2QeSAIJuNhmufj-EljHiqrAJ7N7egzJZUu4iFX6BfoHS75Jqc";
    }

    public getAlbum() {
        const client = Client.instance;
        client.setting = {
            clientId: "a044104fdccc42ddb6174655670a2cdb",
            secretId: "656ecacd4abf4905a02f5403d8f9d1fd",
            scopes: ["user-read-private"],
            redirect_uri: "http://localhost:4200/login"
        };
        const track = new TrackHandler();
        track.search("Animales", {limit: 5}).then((trackCollection) => {
        });
    }

    public login() {
        const client_id = "a044104fdccc42ddb6174655670a2cdb";
        const client_secret = "656ecacd4abf4905a02f5403d8f9d1fd";
        const scopes = ["user-read-email"];
        // &redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
        const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&redirect_uri=http://localhost:4200/login`;
        window.addEventListener("message", function(event) {
            const hash = JSON.parse(event.data);
        }, false);
        const w = window.open(url, "Spotify", 'menubar=no,location=no,resizable=no,scrollbars=no,status=no');
    }

    public search(query: string): Observable<Array<Artist>> {
        // https://api.spotify.com/v1/search?q=pereza&type=album
        let paramHeader = new HttpHeaders();
        paramHeader = paramHeader.append("Authorization", `Bearer ${this.token}`);
        return this.http.get(`${ENDPOINT}search?q=${query}&type=artist`, { headers: paramHeader, observe: "response"})
            .map((res: HttpResponse<any>) => res.body)
            .map((res: any) => res.albums.items.map(i => new Artist(i)));
    }

    public getDataAlbum(id): Observable<Album> {
        let paramHeader = new HttpHeaders();
        paramHeader = paramHeader.append("Authorization", `Bearer ${this.token}`);
        return this.http.get(`${ENDPOINT}albums/${id}`, {headers: paramHeader, observe: "response"})
            .map((res: HttpResponse<Album>) => new Album(res.body));
    }

    public getTrack(idTrack: string): Observable<Tracks> {
        let paramHeader = new HttpHeaders();
        paramHeader = paramHeader.append("Authorization", `Bearer ${this.token}`);
        return this.http.get(`${ENDPOINT}tracks/${idTrack}`, {headers: paramHeader, observe: "response"})
            .map((res: HttpResponse<Tracks>) => new Tracks(res.body));
    }

}
