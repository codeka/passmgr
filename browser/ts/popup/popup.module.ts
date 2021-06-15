import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'

import { AppComponent } from './app';

import { GeneratePasswordComponent } from './generate_password'
import { LoginComponent } from './login';
import { MainMenuComponent } from './main_menu'
import { PopupRoutesModule } from './popup-routes.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneratePasswordComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    PopupRoutesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PopupModule { }
