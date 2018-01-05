import { NgModule } from "@angular/core";

import { Store } from "./store";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: Store, useClass: Store },
  ]
})
export class DbModule { }
