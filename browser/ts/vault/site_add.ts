import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'site-add',
  templateUrl: 'ts/vault/site_add.html',
  styleUrls: ['ts/vault/site_add.css']
})
export class SiteAddComponent {
  browser = browser;

  constructor(@Inject(MatDialogRef) private dialogRef: MatDialogRef<SiteAddComponent>) {
  }
}

