import { Routes } from '@angular/router';
import { ConferenceList } from './conference-list/conference-list';
import { NewConference } from './new-conference/new-conference';
import { KeynoteList } from './keynote-list/keynote-list';
import { Accueil } from './accueil/accueil';
import { canActivateAuthRole } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: Accueil },

  {
    path: 'conferenceList',
    component: ConferenceList,
    canActivate: [canActivateAuthRole],
    data: { requiresAuth: true }
  },

  {
    path: 'keynoteList',
    component: KeynoteList,
    canActivate: [canActivateAuthRole],
    data: { roles: ['ADMIN'] }
  },
  { path: '**', redirectTo: '/home' }
];
