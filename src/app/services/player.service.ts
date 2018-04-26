import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/map";
import { Tracks } from "../models/tracks.model";
import { Subject } from "rxjs/Subject";

declare var Spotify: any;
// tslint:disable-next-line:max-line-length
const TOKEN_SDK_SPOTIFY = 'BQAU-r48I1qDsnbI6UizabqQpf-m8dogATi5uiCYzyG-ELKYuV22EGaRrNcmmFP2dpXJi9U3_RPEDg5We3RNGNlbb5wxqbvaPMeMrtgGhKAcfwqD1PqgxcjfbWZFA5gXhHj2SEJloLQdb81BeWGGeFhXdK_-TJmnDmQ_c4TSTvRc9nTFjgcYTh-PIg';

@Injectable()
export class PlayerService {

    public player: any;
    private device_id: string;
    private current_track: Tracks;
    private $current_track: Subject<Tracks>;
    private stateMusicSnapsot: any;
    private $stateMusic: Subject<any>;
    private token: string;

    constructor(private http: HttpClient) {

        this.$stateMusic = new Subject<any>();
        this.$current_track = new Subject<Tracks>();

        this.token = sessionStorage.token;

        setTimeout(() => {
            if (!!Spotify) {

                console.log("Init Player service");

                // this.player = new Spotify.Player({
                //     name: 'Web Playback SDK Quick Start Player',
                //     getOAuthToken: cb => { cb(sessionStorage.token); }
                // });
                this.player = new Spotify.Player({
                    name: 'Web Playback SDK Quick Start Player',
                    getOAuthToken: cb => { cb(this.token); }
                });
                // Error handling
                this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
                this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
                this.player.addListener('account_error', ({ message }) => { console.error(message); });
                this.player.addListener('playback_error', ({ message }) => { console.error(message); });

                // Playback status updates
                this.player.addListener('player_state_changed', state => {
                    this.stateMusicSnapsot = state;
                    this.$stateMusic.next(this.stateMusicSnapsot);
                    this.current_track = state.track_window ? state.track_window.current_track : null;
                    this.$current_track.next(this.current_track);
                });

                // Ready
                this.player.addListener('ready', ({ device_id }) => {
                    this.device_id = device_id;
                    console.log('Ready with Device ID', device_id);
                });

                // Connect to the player!
                this.player.connect();
            }
        }, 3000);

    }

    public getState(): Observable<any> {
        return this.$stateMusic.asObservable();
    }

    public getCurrentTrack(): Observable<Tracks> {
        return this.$current_track.asObservable();
    }

    public playList(canciones: Array<string>): Observable<any> {

        const spotify_uri = canciones.map(c => "spotify:track:" + c);

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Authorization", "Bearer " + this.token);

        return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, JSON.stringify({uris: spotify_uri}), {
            headers: headers,
            observe: "response"
        }).map(res => res.body);
    }

    public play (idCancion: string): Observable<any> {

        return Observable.fromPromise(this.player.resume());

        // const spotify_uri = "spotify:track:" + idCancion;

        // let headers = new HttpHeaders();
        // headers = headers.append("Content-Type", "application/json");
        // headers = headers.append("Authorization", "Bearer " + this.token);

        // return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, JSON.stringify({uris: [spotify_uri]}), {
        //     headers: headers,
        //     observe: "response"
        // }).map(res => res.body);

    }

    public playToggle(): void {
        this.player.togglePlay().then(() => {
            console.log("play toggle");
        });
    }

    public pause (idCancion: string): Observable<any> {
        return Observable.fromPromise(this.player.pause());
    }

    public openTrack(idCancion: string): Observable<any> {

        const spotify_uri = "spotify:track:" + idCancion;

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Authorization", "Bearer " + this.token);

        
        return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, JSON.stringify({uris: [spotify_uri]}), {
            headers: headers,
            observe: "response"
        }).map(res => res.body);
    }

    public next (): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Authorization", "Bearer " + this.token);

        return this.http.post(`https://api.spotify.com/v1/me/player/next?device_id=${this.device_id}`, null, {
            headers: headers,
            observe: "response"
        });

    }


}
