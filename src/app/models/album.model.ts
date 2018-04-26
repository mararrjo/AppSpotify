import { ListTracks } from "./tracks.model";

export interface Copyrights {
    text: string;
    type: string;
}

export interface Images {
    height: number;
    width: number;
    url: string;
}

export interface IArtist {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    images: Images;
    genres: Array<any>;
    popularity: number;
}

export class Artist implements IArtist {
    public external_urls: { spotify: string };
    public href: string;
    public id: string;
    public name: string;
    public type: string;
    public uri: string;
    public images: Images;
    public genres: Array<any>;
    public popularity: number;

    constructor(response: IArtist) {
        if (response) {
            this.external_urls = response.external_urls;
            this.href = response.href;
            this.id = response.id;
            this.name = response.name;
            this.type = response.type;
            this.uri = response.uri;
            this.images = response.images;
            this.genres = response.genres;
            this.popularity = response.popularity;
        }
    }

}

export interface IAlbum {
    album_type: string;
    artist: Array<Artist>;
    available_markets: Array<string>;
    external_ids: { upc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Array<Images>;
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    copyrights: Array<any>;
    genres: Array<any>;
    label: string;
    popularity: number;
    tracks: ListTracks;
}

export class Album implements IAlbum {

    public album_type: string;
    public artist: any[];
    public available_markets: string[];
    public external_ids: { upc: string; };
    public external_urls: { spotify: string; };
    public href: string;
    public id: string;
    public images: any[];
    public name: string;
    public release_date: string;
    public release_date_precision: string;
    public type: string;
    public uri: string;
    public copyrights: Array<Copyrights>;
    public genres: Array<any>;
    public label: string;
    public popularity: number;
    public tracks: ListTracks;

    constructor(response: IAlbum = null) {
        if (response) {
            this.album_type = response.album_type;
            this.artist = response.artist || [];
            this.available_markets = response.available_markets;
            this.external_ids = response.external_ids || { upc: "" };
            this.external_urls = response.external_urls;
            this.href = response.href;
            this.id = response.id;
            this.images = response.images;
            this.name = response.name;
            this.release_date = response.release_date;
            this.release_date_precision = response.release_date_precision;
            this.type = response.type;
            this.uri = response.uri;
            this.copyrights = response.copyrights || [];
            this.genres = response.genres || [];
            this.label = response.label || "";
            this.popularity = response.popularity || 0;
            this.tracks = response.tracks ? new ListTracks(response.tracks) : new ListTracks();
        } else {
            this.album_type = "";
            this.artist = [];
            this.available_markets = [];
            this.external_ids = { upc: "" };
            this.external_urls = { spotify: "" };
            this.href = "";
            this.id = "";
            this.images = [];
            this.name = "";
            this.release_date = "";
            this.release_date_precision = "";
            this.type = "";
            this.uri = "";
            this.copyrights = [];
            this.genres = [];
            this.label = "";
            this.popularity = 0;
            this.tracks = new ListTracks();
        }
    }

}
