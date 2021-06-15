import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Background } from '../background/api';

@Component({
  selector: 'main-menu',
  templateUrl: 'ts/popup/main_menu.html',
  styleUrls: ['ts/popup/main_menu.css']
})
export class MainMenuComponent implements OnInit {
  browser = browser;

  constructor(@Inject(Router) private router: Router) {}

  ngOnInit(): void {
    Background.getMasterPasswordTime()
      .then((resp) => {
        if (!resp.isCached) {
          // If you don't have a valid master password, redirect immediately to the login page.
          this.router.navigate(['login']);
        }
      });
  }

  openVault(): void {
    browser.tabs.create({ url: "vault.html" });
  }
}
