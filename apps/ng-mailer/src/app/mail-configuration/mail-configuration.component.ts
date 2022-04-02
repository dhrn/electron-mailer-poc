import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mailer-poc-mail-configuration',
  templateUrl: './mail-configuration.component.html',
  styleUrls: ['./mail-configuration.component.scss']
})
export class MailConfigurationComponent {
  editorOptions = {theme: 'vs-dark', language: 'json'};

  constructor(
    public dialogRef: MatDialogRef<MailConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
