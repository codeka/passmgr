import {Component} from '@angular/core';

import {Background} from '../background/api';

@Component({
  selector: 'main-menu',
  templateUrl: 'ts/popup/main_menu.html',
  styleUrls: ['ts/popup/main_menu.css']
})
export class MainMenuComponent {
  browser = browser;

  isMasterPasswordValid: boolean;
  masterPasswordValidTime: number;

  ngOnInit(): void {
    Background.getMasterPasswordTime()
      .then((resp) => {
        this.isMasterPasswordValid = resp.isCached;
        this.masterPasswordValidTime = resp.timeRemaining;
      });
  }

  openVault(): void {
    browser.tabs.create({ url: "vault.html" });
  }
}
