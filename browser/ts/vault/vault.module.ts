import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app';
import {SiteListComponent} from './site_list';

const ROUTES: Routes = [
  { path: '', component: SiteListComponent },
]

@NgModule({
  declarations: [
    AppComponent,
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
    MatToolbarModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class VaultModule { }
