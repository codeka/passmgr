import {Component} from '@angular/core';

import {PasswordGenerator, PasswordGenerateOptions} from 'core/password_generator';

@Component({
  selector: 'generate-password',
  templateUrl: 'ts/popup/generate_password.html',
  styleUrls: ['ts/popup/generate_password.css']
})
export class GeneratePasswordComponent {
  constructor() {
  }

  generate(): string {
    const opt = new PasswordGenerateOptions();
    const password = new PasswordGenerator().generate(opt);
    console.log(password);
    return password;
  }
}
