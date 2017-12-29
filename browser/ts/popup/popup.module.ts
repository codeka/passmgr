import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule, MatToolbarModule} from '@angular/material';

import {PopupComponent} from './popup';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [PopupComponent]
})
export class PopupModule { }
