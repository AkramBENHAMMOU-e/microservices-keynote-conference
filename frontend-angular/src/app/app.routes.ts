import { Routes } from '@angular/router';
import {ConferenceList} from './conference-list/conference-list';
import {NewConference} from './new-conference/new-conference';
import {KeynoteList} from './keynote-list/keynote-list';

export const routes: Routes = [
  { path: '', redirectTo: '/conferenceList', pathMatch: 'full' },
  {path: 'conferenceList' , component:ConferenceList},
  {path: 'keynoteList' , component:KeynoteList}
];
