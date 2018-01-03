import {Component, Inject} from '@angular/core';
import {MatDialog} from '@angular/material';

import {SiteAddComponent} from './site_add';

@Component({
  selector: 'site-list',
  templateUrl: 'ts/vault/site_list.html',
  styleUrls: ['ts/vault/site_list.css']
})
export class SiteListComponent {
  browser = browser;

  constructor(@Inject(MatDialog) private readonly dialog: MatDialog) {
  }

  showAddSite(): void {
    const dialogRef = this.dialog.open(SiteAddComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
