import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule, MatSelectModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app';

import {EnterMasterPasswordComponent} from './enter_master_password';
import {MainMenuComponent} from './main_menu'
import {GeneratePasswordComponent} from './generate_password'

const ROUTES: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'generate-password', component: GeneratePasswordComponent },
  { path: 'enter-master-password', component: EnterMasterPasswordComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    EnterMasterPasswordComponent,
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
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PopupModule { }
