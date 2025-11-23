import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
declare var bootstrap: any;
@Component({
  selector: 'app-conference-list-component',
  standalone: false,
  templateUrl: './conference-list-component.html',
  styleUrl: './conference-list-component.css',
})
export class ConferenceListComponent{


  conferences : Array<any> = [
    {
      "titre": "IA Générative en Entreprise",
      "type": "ACADEMIQUE",
      "date": "2025-12-01",
      "duree": "2H",
      "nbreInscrit": 120,
      "score": 4.5,
      "keynotes" : ["Yahya", "ALi"]
    },
    {
      "titre": "Blockchain & Smart Contracts",
      "type": "COMMERCIALE",
      "date": "2025-11-20",
      "duree": "1H30",
      "nbreInscrit": 85,
      "score": 4.0,
      "keynotes" : ["Akram", "Oussama"]
    },
    {
      "titre": "Cloud Computing AWS",
      "type": "TECHNIQUE",
      "date": "2025-10-18",
      "duree": "3H",
      "nbreInscrit": 200,
      "score": 4.8,
      "keynotes" : ["Akram", "Oussama"]
    },
    {
      "titre": "Développement Mobile Flutter",
      "type": "FORMATION",
      "date": "2025-12-10",
      "duree": "4H",
      "nbreInscrit": 150,
      "score": 4.3,
      "keynotes" : ["Akram", "Oussama"]
    },
    {
      "titre": "Marketing Digital Avancé",
      "type": "COMMERCIALE",
      "date": "2025-12-15",
      "duree": "1H",
      "nbreInscrit": 300,
      "score": 4.1,
      "keynotes" : ["Akram", "Oussama"]
    }
  ];  // Liste affichée

  allConferences: Array<any> = [];       // Copie originale

  selectedConference : any

  public keyword : String = "";

  constructor(private modalService: NgbModal) {
    this.getAllConferences();
  }

  getAllConferences() {
    this.allConferences = [...this.conferences];
  }

  openModal(conf: any, content: any) {
    this.selectedConference = conf;
    this.modalService.open(content, { centered: true });
  }


  deleteConference(conference: any) {
    this.conferences = this.conferences.filter(c => c !== conference);
  }

  searchConference() {
    if (!this.keyword || this.keyword.trim() === "") {
      this.conferences = [...this.allConferences];
    } else {
      const lower = this.keyword.toLowerCase();
      this.conferences = this.allConferences.filter(conf =>
        conf.titre.toLowerCase().includes(lower)
      );
    }
  }

}
