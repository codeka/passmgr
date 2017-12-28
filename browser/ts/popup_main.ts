
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PopupModule } from './popup/popup.module';

//if (environment.production) {
//  enableProdMode();
//}

platformBrowserDynamic().bootstrapModule(PopupModule)
  .catch(err => console.log(err));
