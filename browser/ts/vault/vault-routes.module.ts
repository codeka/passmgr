import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ImportComponent} from './import';
import {SettingsComponent} from './settings';
import {SiteListComponent} from './site_list';

const ROUTES: Routes = [
    { path: 'sites', component: SiteListComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'import', component: ImportComponent },
    { path: '', redirectTo: 'sites', pathMatch: 'full' },
  ]
  
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    useHash: true /* because extensions windows don't like the path location strategy */
  })],
  exports: [RouterModule]
})
export class VaultRoutesModule {
}
