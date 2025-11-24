import { Routes } from '@angular/router';
import {ConferenceList} from './conference-list/conference-list';
import {NewConference} from './new-conference/new-conference';

export const routes: Routes = [
  { path: '', redirectTo: '/conferenceList', pathMatch: 'full' },
  {path: 'conferenceList' , component:ConferenceList},
];
