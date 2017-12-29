import {Component} from '@angular/core';

@Component({
  selector: 'popup',
  template: require('./popup.html'),
  styles: [require('./popup.css')]
})
export class PopupComponent {
  browser = browser;

  constructor() {
  }
}
