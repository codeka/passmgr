import {Component, Inject} from '@angular/core';

import {Store} from 'core/db/store';

@Component({
  selector: 'import',
  templateUrl: 'ts/vault/import.html',
  styleUrls: ['ts/vault/import.css']
})
export class ImportComponent {
  browser = browser;

  fileName: string = "";

  constructor(
      @Inject(Store) store: Store) {
  }

  chooseFile() {
    document.getElementById("file").click();
  }

  updateFile() {
    this.fileName = (document.getElementById("file") as HTMLInputElement).value
        .split('/').pop().split('\\').pop();
  }
}
