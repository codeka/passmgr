import {Component} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

import {Background} from '../background/api';

@Component({
  selector: 'setup',
  templateUrl: 'ts/popup/setup.html',
  styleUrls: ['ts/popup/setup.css']
})
export class SetupComponent {
  browser = chrome

  constructor() {
  }

  signIn(): void {
    console.log('deriving new key...');
    const startTime = performance.now();
    Background.deriveMasterKey("hello-world", 60)
      .then((key) => {
        // ignore the key, just go back... todo: if someone's called us specifically asking for
        // the key, go back to them.
        const endTime = performance.now();
        console.log('key derived in ' + (endTime - startTime));
      })
      .catch((err) => {
        // TODO: handle errors.
        console.log('an error occured: ' + err);
      });
  } 
}
