import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatSelectModule} from '@angular/material/select'
import {MatToolbarModule} from '@angular/material/toolbar'

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
