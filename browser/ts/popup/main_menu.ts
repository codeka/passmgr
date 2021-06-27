import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'main-menu',
  templateUrl: 'ts/popup/main_menu.html',
  styleUrls: ['ts/popup/main_menu.css']
})
export class MainMenuComponent implements OnInit {
  browser = chrome

  constructor(@Inject(Router) private router: Router) {}

  ngOnInit(): void {
    console.log("hello");
  }

  openVault(): void {
    chrome.tabs.create({ url: "vault.html" });
  }
}
