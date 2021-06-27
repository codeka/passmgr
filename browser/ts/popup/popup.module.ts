import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'

import { AppComponent } from './app';
import { ApiService } from './services/api.service';
import { SetupCanActivateService } from './services/setupcanactivate.service';

import { GeneratePasswordComponent } from './generate_password'
import { LoginComponent } from './login';
import { MainMenuComponent } from './main_menu'
import { PopupRoutesModule } from './popup-routes.module';
import { SetupComponent } from './setup';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneratePasswordComponent,
    MainMenuComponent,
    SetupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    PopupRoutesModule,
  ],
  providers: [
    ApiService,
    SetupCanActivateService,
    {
      provide: APP_INITIALIZER,
      useFactory: (api: ApiService) => () => { return api.init() },
      deps: [ApiService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class PopupModule { }
