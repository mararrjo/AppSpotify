import { Component, OnInit, OnDestroy } from "@angular/core";
import { Tracks } from "../../../models/tracks.model";
import { PlayerService } from "../../../services/player.service";
// import { clearInterval, setInterval } from "timers";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

@Component({
    selector: "app-player",
    templateUrl: "./player.component.html"
})
export class PlayerComponent implements OnInit, OnDestroy {

    public currentTrack: Tracks;
    public state: any;

    public progress: number;
    public progressTotal: number;

    private interval: any;
    private ngUnsubscribe: Subject<any>;

    constructor(
        private playerService: PlayerService
    ) {
        this.progress = 0;
        this.progressTotal = 0;
        this.ngUnsubscribe = new Subject<any>();
    }

    public ngOnInit(): void {
        this.playerService.getCurrentTrack().subscribe((track: Tracks) => {
            this.currentTrack = track;
            console.log(this.currentTrack);
        });
        this.playerService.getState().subscribe(state => {
            this.state = state;
            if (this.state.duration) {
                this.progress = this.state.position;
                this.progressTotal = this.state.duration;
            }
            if (!this.state.paused) {
                if (!this.interval) {
                    this.initProgressBar();
                }
            } else {
                this.stopProgressBar();
            }
            console.log(this.state);
        });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public playCurrentTrack(): void {
        if (this.currentTrack) {
            const idTrack = this.currentTrack.id;
            this.playerService.play(idTrack).subscribe(() => {
            });
        }
    }

    public pauseCurrentTrack(): void {
        if (this.currentTrack) {
            // this.stopProgressBar();
            const idTrack = this.currentTrack.id;
            this.playerService.pause(idTrack).subscribe();
        }
    }

    public nextCurrentTrack(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.state) {
            if (this.state.track_window.next_tracks.length > 0) {
                const nextTrack = this.state.track_window.next_tracks[0];
                this.playerService.next().subscribe();
            }
        }
    }

    private initProgressBar(): void {

        const timer = Observable.timer(0, 1000);
        this.interval = timer
            .takeUntil(this.ngUnsubscribe)
            .subscribe((t: number) => {
                if (this.progress <= this.progressTotal - 1000) {
                    this.progress += 1000;
                } else {
                    this.stopProgressBar();
                }
                console.log("timer:", t, this.progress);
            });
        console.log("Init progress bar", this.interval);
    }

    private stopProgressBar(): void {
        if (this.interval) {
            console.log("Stop progress bar", this.interval);
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
            this.interval.unsubscribe();
            this.interval = null;
            // this.progress = 0;
        }
    }

    public progressPercentage(): number {
        return this.progress * 100 / this.progressTotal;
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
