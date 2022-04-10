import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  DynamicFormModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicFormService,
  DynamicFormGroupModel
} from "@ng-dynamic-forms/core";

export const MY_FORM_MODEL: DynamicFormModel = [

  new DynamicInputModel({
      id: "host",
      label: "Host",
      placeholder: "Mail Host",
      additional: {
        appearance: "fill"
      }
  }),

  new DynamicInputModel({
    id: "port",
    label: "Port",
    placeholder: "Mail Port",
    additional: {
      appearance: "fill"
    }
  }),


  new DynamicFormGroupModel({
    id: "auth",
    legend: "Authentication",
    group: [
        new DynamicInputModel({
            id: "user",
            label: "User Name",
            additional: {
              appearance: "fill"
            }
        }),
        new DynamicInputModel({
            id: "pass",
            label: "Password",
            additional: {
              appearance: "fill"
            }
        })
    ]
}),

  new DynamicCheckboxModel({
      id: "secureConnection",
      label: "Secure Connection",
      additional: {
        appearance: "fill"
      }
  })
];
@Component({
  selector: 'mailer-poc-mail-configuration',
  templateUrl: './mail-configuration.component.html',
  styleUrls: ['./mail-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MailConfigurationComponent {
  TABS = { 1: "FORM", 2: "EDITOR" };
  editorOptions = {theme: 'vs-dark', language: 'json'};
  currentTab: 1 | 2 = 1;
  formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup;

  constructor(
    private formService: DynamicFormService,
    public dialogRef: MatDialogRef<MailConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
   this.formGroup = this.formService.createFormGroup(this.formModel);
   this.formGroup.patchValue(JSON.parse(data));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    const TAB_NAME = this.TABS[this.currentTab] ?? "FORM";
    if (TAB_NAME === "FORM") {
      this.data = JSON.stringify(this.formGroup.value, null, 4);
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close(this.data);
    }
  }

  resize(event: any) {
    this.currentTab = event.index;
    this.data = JSON.stringify(this.formGroup.value, null, 4);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
  }, 200);
  }
}
