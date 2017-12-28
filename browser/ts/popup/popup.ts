import { Component } from '@angular/core';

@Component({
  selector: 'popup',
  template: '<h1>Popup</h1>'
})
export class PopupComponent {
  constructor() {
    console.log("HI");
  }
}
