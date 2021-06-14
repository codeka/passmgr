import {Component, Inject, ElementRef} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Observable} from 'rxjs';
import {Observer} from 'rxjs';

import * as csvParse from 'csv-parse';

import {UnencryptedInMemorySite} from 'core/db/model';
import {Store} from 'core/db/store';

class ImportResult {
  totalEntries: number;
  currentEntry: number;
  site: UnencryptedInMemorySite;
}

interface Importer {
  parse(contents: string): Observable<ImportResult>;
}

class LastPassImporter implements Importer {
  parse(contents: string): Observable<ImportResult> {
    return new Observable((observer: Observer<ImportResult>) => {
      csvParse(contents, {
        columns: true,
      }, (err: any, output: Array<any>) => {
        if (err) {
          observer.error(err);
        } else {
          for (let i = 0; i < output.length; i++) {
            const site = new UnencryptedInMemorySite();
            site.name = output[i].name;
            site.url = output[i].url;
            site.username = output[i].username;
            site.formFields = [
              { fieldName: "username", fieldValue: output[i].username, isUsername: true,
                isPassword: false, },
              { fieldName: "password", fieldType: "password", fieldValue: output[i].username,
                isUsername: false, isPassword: true, }
            ];
            const res: ImportResult = {
              totalEntries: output.length,
              currentEntry: i,
              site
            };
            observer.next(res);
          }
        }
      });
    });
  }
}

class BitWardenJsonImporter implements Importer {
  parse(contents: string): Observable<ImportResult> {
    return new Observable((observer: Observer<ImportResult>) => {
      // TODO: implement me!
      return null;
    })
  }
}

@Component({
  selector: 'import',
  templateUrl: 'ts/vault/import.html',
  styleUrls: ['ts/vault/import.css']
})
export class ImportComponent {
  browser = browser;

  progress: number = 0;
  progressMode: string = "indeterminate";
  fileName: string = "";
  file: File;

  constructor(
      @Inject(MatSnackBar) private readonly snackBar: MatSnackBar,
      @Inject(Store) private readonly store: Store,
      @Inject(ElementRef) private readonly element: ElementRef) {
  }

  chooseFile(): void {
    document.getElementById("file").click();
  }

  updateFile(): void {
    const input = document.getElementById("file") as HTMLInputElement;
    this.file = input.files[0];
    this.fileName = (document.getElementById("file") as HTMLInputElement).value
        .split('/').pop().split('\\').pop();
  }

  import(): void {
    this.element.nativeElement.querySelector("mat-progress-bar").style.display = "block";
    this.progress = 0;
    this.progressMode = "indeterminate";

    const reader = new FileReader();
    reader.onload = (f) => {
      const contents = reader.result as string;

      // TODO: support other importer types
      const importer = new LastPassImporter();
      importer.parse(contents).subscribe(
        (result) => {
          this.progressMode = "determinate";
          this.progress = Math.round(result.currentEntry / result.totalEntries * 100);
          this.store.saveSite(result.site);
        },
        (err) => {
          this.element.nativeElement.querySelector("mat-progress-bar").style.display = "none";
          this.snackBar.open(err, browser.i18n.getMessage("close"));
        }
      )
    };
    reader.readAsText(this.file);
  }
}
