import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PopupComponent } from './popup';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [PopupComponent]
})
export class PopupModule { }
