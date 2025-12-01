import { Routes } from '@angular/router';
import {ConferenceList} from './conference-list/conference-list';
import {NewConference} from './new-conference/new-conference';
import {KeynoteList} from './keynote-list/keynote-list';
import {Accueil} from './accueil/accueil';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home' , component:Accueil},
  {path: 'conferenceList' , component:ConferenceList},
  {path: 'keynoteList' , component:KeynoteList}
];
