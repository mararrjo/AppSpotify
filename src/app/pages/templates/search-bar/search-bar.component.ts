import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-search-bar",
    templateUrl: "./search-bar.component.html"
})
export class SearchBarComponent implements OnInit {

    private word: string;

    @Input()
    public type: string;

    @Output()
    public search: EventEmitter<string>;

    constructor() {
        this.word = "";
        this.type = "album";
        this.search = new EventEmitter<string>();
    }

    public ngOnInit(): void {

    }

    public onSearch(): void {
        this.search.emit(this.word);
    }

}
