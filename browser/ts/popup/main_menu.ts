import {Component} from '@angular/core';

@Component({
  selector: 'main-menu',
  templateUrl: 'ts/popup/main_menu.html',
  styleUrls: ['ts/popup/main_menu.css']
})
export class MainMenuComponent {
  browser = browser;

  openVault(): void {
    browser.tabs.create({ url: "vault.html" });
  }
}
