import { Artist } from "./album.model";
import { SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

export interface ITracks {
    artists: Array<Artist>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string | SafeResourceUrl | SafeUrl;
}

export class Tracks implements ITracks {
    public artists: Array<Artist>;
    public available_markets: Array<string>;
    public disc_number: number;
    public duration_ms: number;
    public explicit: boolean;
    public external_urls: { spotify: string };
    public href: string;
    public id: string;
    public is_local: boolean;
    public name: string;
    public preview_url: string;
    public track_number: number;
    public type: string;
    public uri: string | SafeResourceUrl | SafeUrl;

    constructor ( response: ITracks = null ) {
        if (response) {
            this.artists = response.artists;
            this.available_markets = response.available_markets;
            this.disc_number = response.disc_number;
            this.duration_ms = response.duration_ms;
            this.explicit = response.explicit;
            this.external_urls = response.external_urls;
            this.href = response.href;
            this.id = response.id;
            this.is_local = response.is_local;
            this.name = response.name;
            this.preview_url = response.preview_url;
            this.track_number = response.track_number;
            this.type = response.type;
            this.uri = response.uri;
        }
    }

}

export interface IListTracks {
    href: string;
    items: Array<Tracks>;
    limit: number;
    next: string;
    previous: string;
    total: number;
}

export class ListTracks implements IListTracks {
    public href: string;
    public items: Array<Tracks>;
    public limit: number;
    public next: string;
    public previous: string;
    public total: number;

    constructor(response: IListTracks = null) {
        if (response) {
            this.href = response.href;
            this.items = response.items.map((i: ITracks) => new Tracks(i));
            this.limit = response.limit;
            this.next = response.next;
            this.previous = response.previous;
            this.total = response.total;
        } else {
            this.href = "";
            this.items = [];
            this.limit = 0;
            this.next = "";
            this.previous = "";
            this.total = 0;
        }
    }

}
