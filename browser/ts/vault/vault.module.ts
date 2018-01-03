import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule} from '@angular/material';

import {AppComponent} from './app';
import {SettingsComponent} from './settings';
import {SiteAddComponent} from './site_add';
import {SiteListComponent} from './site_list';

const ROUTES: Routes = [
  { path: 'sites', component: SiteListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'sites', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    SiteAddComponent,
    SiteListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true /* because extensions windows don't like the path location strategy */
    })
  ],
  exports: [SiteAddComponent],
  entryComponents: [SiteAddComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class VaultModule { }
