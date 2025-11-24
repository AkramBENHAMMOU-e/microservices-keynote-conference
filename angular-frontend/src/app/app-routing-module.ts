import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewConference} from './new-conference/new-conference';
import {ConferenceListComponent} from './conference-list-component/conference-list-component';

const routes: Routes = [
  {path: '', redirectTo: '/conferenceList', pathMatch: 'full'},
  {path: 'conferenceList', component: ConferenceListComponent},
  {path : 'newConference' , component: NewConference}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
