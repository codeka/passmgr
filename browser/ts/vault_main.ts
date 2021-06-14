
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import './polyfills';

import { VaultModule } from './vault/vault.module';

//if (environment.production) {
//  enableProdMode();
//}

platformBrowserDynamic().bootstrapModule(VaultModule)
  .catch(err => console.log(err));
