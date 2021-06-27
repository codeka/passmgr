import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePasswordComponent } from './generate_password';
import { LoginComponent } from './login';
import { MainMenuComponent } from './main_menu';
import { SetupCanActivateService } from './services/setupcanactivate.service';
import { SetupComponent } from './setup';

const ROUTES: Routes = [
    { path: '', component: MainMenuComponent, canActivate: [SetupCanActivateService] },
    { path: 'generate-password', component: GeneratePasswordComponent },
    { path: 'login', component: LoginComponent },
    { path: 'setup', component: SetupComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class PopupRoutesModule {
}
