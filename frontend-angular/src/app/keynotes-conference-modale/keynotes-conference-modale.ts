import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeynotesService} from '../services/keynotes.service';
import {Keynote} from '../models/Keynote';
import {ConferenceService} from '../services/conference.service';

@Component({
  selector: 'app-keynotes-conference-modale',
  imports: [
     CommonModule
  ],
  standalone: true,
  templateUrl: './keynotes-conference-modale.html',
  styleUrl: './keynotes-conference-modale.css',
})
export class KeynotesConferenceModale implements OnInit{


  @Input() conference: any;
  @Output() close = new EventEmitter();
  keynotes! : Array<any>;

  constructor(private keynoteService : KeynotesService, private conferenceService: ConferenceService) {
  }

  ngOnInit(){
      this.getAllKeynotes();
      console.log("Conference:", this.conference);
      this.getKeynotesByConference(this.conference.id);
  }

  getAllKeynotes(){
    this.keynoteService.getAllKeynotes().subscribe({
      next : data => this.keynotes = data
    })
  }




  selectKeynote(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newId = selectElement.value;
    const currentIds = this.conference.keynotes
      ? this.conference.keynotes.map((k: any) => k.id)
      : [];// on récupère l'id
    if (!currentIds.includes(newId)) {
      currentIds.push(newId);
    }

    this.conferenceService.addKeynoteToConference(this.conference.id, currentIds).subscribe({
      next: (data) => {
        this.getKeynotesByConference(this.conference.id);
      }
    });


    /*// retrouver l'objet Keynote complet
    const keynote = this.keynotes.find(k => k.id === id);

    if (!keynote) return;

    if (option.selected && this.conference.keynotes.every((k: Keynote) => k.id !== id)) {
      // ajouter si pas déjà présent
      this.conference.keynotes.push(keynote);
    }
*/

  }


  retireKeynote(k: any) {
    this.conferenceService.deleteKeynoteFromConference(this.conference.id, k.id).subscribe(
      {
        next : data => {
          this.getKeynotesByConference(this.conference.id);
        }
      }
    )
  }


  getKeynotesByConference(conferenceId: any)  {
    this.conferenceService.getKeynotesByConference(conferenceId).subscribe({
      next : data => {
        console.log("Keynotes by conference:", data);
        this.conference.keynotes = data;
        console.log("Keynotes by conference: apres", this.conference.keynotes);


      },
      error : err => console.error(err)
    })
  }


}
