import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './pages/templates/sidebar/sidebar.component';
import { ClientService } from './services/client.service';
import { SearchBarComponent } from './pages/templates/search-bar/search-bar.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { TrackListComponent } from './pages/templates/track-list/track-list.component';
import { PlayerService } from './services/player.service';
import { PlayerComponent } from './pages/templates/player/player.component';

const routes: Routes = [
    {
        path: "",
        component: AlbumsComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "albums",
        component: AlbumsComponent
    },
    {
        path: "artists",
        component: ArtistsComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AlbumsComponent,
        ArtistsComponent,
        LoginComponent,
        SidebarComponent,
        SearchBarComponent,
        TrackListComponent,
        PlayerComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ClientService,
        PlayerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
