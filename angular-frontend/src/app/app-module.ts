import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ConferenceListComponent } from './conference-list-component/conference-list-component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewConference } from './new-conference/new-conference';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    App,
    ConferenceListComponent,
    NewConference
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  exports: [
    NewConference
  ],
  bootstrap: [App]
})
export class AppModule { }
