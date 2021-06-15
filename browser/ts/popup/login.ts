import {Component} from '@angular/core';

import {PasswordGenerator, PasswordGenerateOptions} from 'core/password_generator';
import {Background} from '../background/api';

@Component({
  selector: 'login',
  templateUrl: 'ts/popup/login.html',
  styleUrls: ['ts/popup/login.css']
})
export class LoginComponent {
  browser = browser;

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
