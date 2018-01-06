import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule} from '@angular/material';

import {DbModule} from 'core/db/db.module';

import {AppComponent} from './app';
import {ImportComponent} from './import';
import {SettingsComponent} from './settings';
import {SiteEditDialogComponent} from './site_edit_dialog';
import {SiteListComponent} from './site_list';

const ROUTES: Routes = [
  { path: 'sites', component: SiteListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'import', component: ImportComponent },
  { path: '', redirectTo: 'sites', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    SettingsComponent,
    SiteEditDialogComponent,
    SiteListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DbModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true /* because extensions windows don't like the path location strategy */
    })
  ],
  exports: [SiteEditDialogComponent],
  entryComponents: [SiteEditDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class VaultModule { }
