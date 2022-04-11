import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailConfigurationComponent } from './mail-configuration/mail-configuration.component';
declare let window: any;
const ETHEREAL_KEY = "ETHEREAL_KEY";
const ETHEREAL_CONFIG: Options = {
  "host": "smtp.ethereal.email",
  "port": 587,
  "auth": {
      "user": "clement.kunze56@ethereal.email",
      "pass": "qMMZNecSMA3t2Sdmt4"
  },
  "secureConnection": true
};

export interface Options {
  host: string;
  port: number;
  auth: {
    user: string,
    pass: string
  },
  secureConnection: boolean
}
@Component({
  selector: 'mailer-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  config: Options = JSON.parse(localStorage.getItem(ETHEREAL_KEY) ?? JSON.stringify(ETHEREAL_CONFIG))
  mail = {
    from: 'foo@example.com',
    to: 'bar@example.com, baz@example.com',
    subject: 'I am from Electron',
    body: 'Test mail from electron'
  }

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {
    window.electron.setupTransporter(this.config);
  }

  openMailConfig() {
    this.dialog.open(MailConfigurationComponent, { data: JSON.stringify(this.config, null, 4) })
    .afterClosed()
    .subscribe(async (data) => {
      if (data) {
        try {
          this.config = JSON.parse(data);
          this.mail.from = this.config?.auth?.user ?? "unknown@test.com";
          await window.electron.setupTransporter(this.config)
          this._snackBar.open('Config set', undefined, {
            duration: 2000
          });
        } catch(e) {
          this._snackBar.open('Failed to parse the config', undefined, {
            duration: 2000
          });
        }
      }
    })
  }

  async senMail() {
    try {
      console.log(this.mail)
      const result = await window.electron.sendMail(this.mail);
      console.log(result);
      this._snackBar.open('Mail Sent', undefined, {
        duration: 2000
      });
    } catch(e) {
      console.log(e);
      this._snackBar.open('Failed to send mail', undefined, {
        duration: 2000
      });
    }
  }

  ngOnDestroy(): void {
      localStorage.setItem(ETHEREAL_KEY, JSON.stringify(this.config));
  }
}
