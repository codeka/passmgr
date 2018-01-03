import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app';
import {SettingsComponent} from './settings';
import {SiteListComponent} from './site_list';

const ROUTES: Routes = [
  { path: '', component: SiteListComponent },
  { path: 'settings', component: SettingsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    SiteListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot(ROUTES, { useHash: true /* because extensions windows don't like the path location strategy */ })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class VaultModule { }
