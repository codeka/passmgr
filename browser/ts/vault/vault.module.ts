import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'

import { DbModule } from 'core/db/db.module';

import { AppComponent } from './app';
import { ImportComponent } from './import';
import { SettingsComponent } from './settings';
import { SiteEditDialogComponent } from './site_edit_dialog';
import { SiteListComponent } from './site_list';
import { VaultRoutesModule } from './vault-routes.module';

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
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    VaultRoutesModule,
  ],
  exports: [SiteEditDialogComponent],
  entryComponents: [SiteEditDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class VaultModule { }
