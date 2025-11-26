import {Component, OnInit} from '@angular/core';
import {ConferenceService} from '../services/conference.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {KeynotesConferenceModale} from '../keynotes-conference-modale/keynotes-conference-modale';
import {NewConference} from '../new-conference/new-conference';


@Component({
  selector: 'app-conference-list',
  imports: [
    CommonModule,
    FormsModule,
    KeynotesConferenceModale,
    NewConference,
    // pour [(ngModel)]
  ],
  standalone: true,
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList implements OnInit {

  conferences: Array<any> = [];
  allConferences: Array<any> = [];       // Copie originale

  selectedConference : any = null;
  newConference : boolean = false;

  public keyword : String = "";

  constructor( private conferenceService:ConferenceService, private router:Router) {

  }

  ngOnInit(){
    this.getAllConferences();
  }

  getAllConferences() {
    this.conferenceService.getAllConfernces().subscribe({
      next : data => {
        console.log('Données reçues:', data);
        this.conferences = data || [];
        this.allConferences = data || [];  // Sauvegarder la copie originale
        console.log('Conferences chargées:', this.conferences.length);
      },
      error : err => {
        console.error('Erreur lors du chargement des conférences:', err);
      }
    });
  }



  deleteConference(conference: any) {
    this.conferenceService.deleteConference(conference).subscribe(
      {
        next : data => {
          //this.getAllConferences();

          this.conferences = this.conferences.filter(c => c !== conference);
        }
      }
    )
  }

    searchConference() {
      if (!this.allConferences || this.allConferences.length === 0) {
        return; // Empêche d'écraser la liste avant chargement
      }

      if (!this.keyword.trim()) {
        this.conferences = [...this.allConferences];
        return;
      }

      const lower = this.keyword.toLowerCase();
      this.conferences = this.allConferences.filter(conf =>
        conf.titre?.toLowerCase().includes(lower)
      );
    }

  openModal(conf: any) {
    this.selectedConference = conf;
  }

  closeModal(){
    this.selectedConference = null;
  }

  openNewConference() {
    this.newConference = true;
  }

  closeNewConference(){
    this.newConference = false;
  }

  onconferenceAdded(conf: any) {
    this.conferences.push(conf);
  }
}

