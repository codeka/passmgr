import {Component, Inject} from '@angular/core';
import {MatDialog} from '@angular/material';

import {SiteEditDialogComponent} from './site_edit_dialog';

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
    const dialogRef = this.dialog.open(SiteEditDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
