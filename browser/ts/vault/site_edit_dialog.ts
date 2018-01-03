import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'site-edit-dialog',
  templateUrl: 'ts/vault/site_edit_dialog.html',
  styleUrls: ['ts/vault/site_edit_dialog.css']
})
export class SiteEditDialogComponent {
  browser = browser;

  // Whether we should be showing or hiding the password.
  hidePassword = true;

  constructor(@Inject(MatDialogRef) private dialogRef: MatDialogRef<SiteEditDialogComponent>) {
  }
}

