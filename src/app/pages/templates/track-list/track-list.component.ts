import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from "@angular/core";
import { Tracks } from "../../../models/tracks.model";
import { PlayerService } from "../../../services/player.service";

@Component({
    selector: "app-track-list",
    templateUrl: "./track-list.component.html"
})
export class TrackListComponent implements OnInit, OnChanges {

    private audioObject: any;
    private played: boolean;
    private state: any;
    private currentTrack: Tracks;

    @Input()
    public items: Array<Tracks>;

    @Input()
    public showAlbum: boolean;

    @Output()
    public closed: EventEmitter<boolean>;

    public listaCanciones: Array<Tracks>;

    constructor(
        private playerService: PlayerService,
    ) {
        this.listaCanciones = [];
        this.played = false;
        this.closed = new EventEmitter<boolean>();
    }

    public ngOnInit(): void {
        this.listaCanciones = this.items;

        this.playerService.getState().subscribe(state => {
            this.state = state;
        });

        this.playerService.getCurrentTrack().subscribe((currentTrack: Tracks) => {
            this.currentTrack = currentTrack;
        });

    }

    public ngOnChanges() {
        this.listaCanciones = this.items;
    }

    public clickCancion(event, index: number): void {
        event.preventDefault();
        const id = this.listaCanciones[index].id;
        this.playerService.openTrack(id).subscribe();
        // const previewUrl = this.listaCanciones[index].preview_url;
        // this.playerService.play(id).subscribe(res => {
        //     console.log(res);
        // });
    }

    public playPause(index: number): void {
        event.preventDefault();
        const track = this.listaCanciones[index];
        if (this.currentTrack && this.currentTrack.id === track.id) {
            this.playerService.playToggle();
        } else {
            this.playerService.openTrack(track.id).subscribe();
        }
        // const id = this.listaCanciones[index].id;
        // if (this.played) {
        //     this.playerService.pause(id).subscribe(res => {
        //         console.log(res);
        //     });
        // } else {
        //     this.playerService.play(id).subscribe(res => {
        //         console.log(res);
        //     });
        // }
        // this.played = !this.played;
    }

    public irCancionSpotify(index: number): void {
        if (this.audioObject) {
            this.audioObject.pause();
            this.audioObject = null;
        }
        window.open(this.listaCanciones[index].external_urls.spotify);
    }

    public closeCanciones(): void {
        this.listaCanciones = [];
        this.closed.emit(true);
    }

    public msToTime(duration) {
        const milliseconds = (duration % 1000) / 100;
        const seconds = Math.trunc((duration / 1000) % 60)
            , minutes = Math.trunc((duration / (1000 * 60)) % 60);

        const minutesS = (minutes < 10) ? "0" + minutes : minutes;
        const secondsS = (seconds < 10) ? "0" + seconds : seconds;

        return minutesS + ":" + secondsS;
    }

}
