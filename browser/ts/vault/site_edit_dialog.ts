import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import {Store} from 'core/db/store';
import {UnencryptedInMemorySite} from 'core/db/model';

@Component({
  selector: 'site-edit-dialog',
  templateUrl: 'ts/vault/site_edit_dialog.html',
  styleUrls: ['ts/vault/site_edit_dialog.css']
})
export class SiteEditDialogComponent {
  browser = browser;

  // Whether we should be showing or hiding the password.
  hidePassword = true;

  siteForm: FormGroup;

  constructor(
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<SiteEditDialogComponent>,
    @Inject(Store) private readonly store: Store) {
  }

  ngOnInit(): void {
    this.siteForm = new FormGroup({
      name: new FormControl(),
      url: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      notes: new FormControl()
    });
  }

  save() {
    const site = new UnencryptedInMemorySite();
    const form = this.siteForm.value as {
      name: string,
      url: string,
      username: string,
      password: string,
      notes: string
    };
    site.name = form.name;
    site.url = form.url;
    site.notes = form.password;
    site.formFields = [
      { fieldName: "username", fieldValue: form.username, isUsername: true, isPassword: false },
      { fieldName: "password", fieldValue: form.password, isUsername: false, isPassword: true },
    ];

    this.store.saveSite(site)
      .then(() => {
        this.dialogRef.close();
      });
  }
}

