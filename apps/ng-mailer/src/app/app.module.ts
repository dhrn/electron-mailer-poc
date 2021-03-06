import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MailConfigurationComponent } from './mail-configuration/mail-configuration.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";

@NgModule({
  declarations: [AppComponent, MailConfigurationComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, MonacoEditorModule.forRoot(), FormsModule, ReactiveFormsModule, DynamicFormsMaterialUIModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
