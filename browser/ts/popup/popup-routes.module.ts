import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePasswordComponent } from './generate_password';
import { LoginComponent } from './login';
import { MainMenuComponent } from './main_menu';

const ROUTES: Routes = [
    { path: '', component: MainMenuComponent },
    { path: 'generate-password', component: GeneratePasswordComponent },
    { path: 'login', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class PopupRoutesModule {
}
