import {Component, Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataSource} from '@angular/cdk/collections';
import {from, Observable} from 'rxjs';
import 'rxjs/add/observable/fromPromise';

import {Store} from 'core/db/store';
import {SiteInfo} from 'core/db/model';

import {SiteEditDialogComponent} from './site_edit_dialog';

class SiteListDataSource extends DataSource<SiteInfo> {
  constructor(private sites: Observable<SiteInfo[]>) {
    super();
  }

  connect(): Observable<SiteInfo[]> {
    return this.sites;
  }

  disconnect(): void {
  }
}

@Component({
  selector: 'site-list',
  templateUrl: 'ts/vault/site_list.html',
  styleUrls: ['ts/vault/site_list.css']
})
export class SiteListComponent {
  sites: SiteListDataSource;

  constructor(
      @Inject(MatDialog) private readonly dialog: MatDialog,
      @Inject(Store) store: Store) {
    this.sites = new SiteListDataSource(from(store.listSites()));
  }

  showAddSite(): void {
    const dialogRef = this.dialog.open(SiteEditDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }

  rowClick(site: SiteInfo): void {
    const dialogRef = this.dialog.open(SiteEditDialogComponent, {
      width: '600px',
      data: site,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
